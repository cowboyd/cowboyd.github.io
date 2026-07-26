import type { HTTPMiddleware } from "revolution";

// The favicon is read into memory once at module load. Small enough that this
// is cheaper than a Deno.readFile on every /favicon.png hit, and the bytes
// don't change between deploys within a single process lifetime.
const faviconBytes = await Deno.readFile(
  new URL("../assets/favicon.png", import.meta.url),
);

export function faviconRoute(): HTTPMiddleware {
  return function* () {
    return new Response(faviconBytes, {
      headers: {
        "content-type": "image/png",
        "cache-control": "public, max-age=86400",
      },
    });
  };
}
