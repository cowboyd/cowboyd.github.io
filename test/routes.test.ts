import { assertEquals, assertStringIncludes } from "jsr:@std/assert@^1.0.0";
import { delay } from "jsr:@std/async@^1.0.0/delay";

const BASE = "http://localhost:8006";
let serverProcess: Deno.ChildProcess | undefined;

async function startServer() {
  const command = new Deno.Command(Deno.execPath(), {
    args: ["run", "-A", "main.tsx"],
    env: { PORT: "8006" },
    stdout: "null",
    stderr: "inherit",
  });
  serverProcess = command.spawn();
  // wait for the server to be reachable
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(BASE + "/");
      await res.body?.cancel();
      if (res.status < 500) return;
    } catch {
      // not up yet
    }
    await delay(200);
  }
  throw new Error("server did not start");
}

async function stopServer() {
  if (serverProcess) {
    try { serverProcess.kill("SIGTERM"); } catch { /* already gone */ }
    await serverProcess.status;
    serverProcess = undefined;
  }
}

Deno.test({
  name: "route smoke tests",
  sanitizeOps: false,
  sanitizeResources: false,
  async fn(t) {
    await startServer();
    try {
      await t.step("/ returns 200 with Charles Lowell", async () => {
        const res = await fetch(BASE + "/");
        assertEquals(res.status, 200);
        const body = await res.text();
        assertStringIncludes(body, "Charles Lowell");
      });

      await t.step("/cv returns 200 with Selected Work", async () => {
        const res = await fetch(BASE + "/cv");
        assertEquals(res.status, 200);
        const body = await res.text();
        assertStringIncludes(body, "Selected Work");
        assertStringIncludes(body, "Effection");
      });

      await t.step("/blog returns 200", async () => {
        const res = await fetch(BASE + "/blog");
        assertEquals(res.status, 200);
      });

      await t.step("/sitemap.xml lists all content routes", async () => {
        const res = await fetch(BASE + "/sitemap.xml");
        assertEquals(res.status, 200);
        const body = await res.text();
        for (const path of ["/", "/cv", "/blog"]) {
          const expected = `<loc>${BASE}${path}</loc>`;
          assertStringIncludes(body, expected);
        }
      });

      await t.step("/cv.pdf returns a valid PDF", async () => {
        const res = await fetch(BASE + "/cv.pdf");
        assertEquals(res.status, 200);
        assertEquals(res.headers.get("content-type"), "application/pdf");
        const buf = new Uint8Array(await res.arrayBuffer());
        // PDF files start with the magic bytes "%PDF"
        const magic = String.fromCharCode(buf[0], buf[1], buf[2], buf[3]);
        assertEquals(magic, "%PDF");
        // A rendered CV should be at least a few KB. Anything smaller
        // suggests Chromium produced an error page or blank output.
        if (buf.byteLength <= 1024) {
          throw new Error(
            `PDF is suspiciously small (${buf.byteLength} bytes)`,
          );
        }
      });

      await t.step("/sitemap.xml lists /cv.pdf", async () => {
        const res = await fetch(BASE + "/sitemap.xml");
        const body = await res.text();
        assertStringIncludes(body, `<loc>${BASE}/cv.pdf</loc>`);
      });
    } finally {
      await stopServer();
    }
  },
});
