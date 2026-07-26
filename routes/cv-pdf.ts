import { call } from "effection";
import { launch } from "@astral/astral";
import { useCurrentRequest } from "../plugins/current-request.ts";
import type { SitemapRoute } from "../plugins/sitemap.ts";

export function cvPdfRoute(): SitemapRoute<Response> {
  return {
    *routemap(generate) {
      return [{ pathname: generate(), priority: 0.8 }];
    },
    *handler() {
      let request = yield* useCurrentRequest();
      let url = new URL(request.url);
      let cvUrl = new URL("/cv", url).toString();

      let browser = yield* call(() => launch());
      try {
        let page = yield* call(() => browser.newPage());
        let cdp = page.unsafelyGetCelestialBindings();
        yield* call(() => cdp.Emulation.setEmulatedMedia({ media: "print" }));
        yield* call(() => page.goto(cvUrl, { waitUntil: "networkidle2" }));
        let pdf = yield* call(() =>
          page.pdf({
            paperWidth: 8.5,
            paperHeight: 11,
            printBackground: true,
            marginTop: 0.6,
            marginBottom: 0.6,
            marginLeft: 0.6,
            marginRight: 0.6,
          })
        );
        return new Response(new Blob([pdf as Uint8Array<ArrayBuffer>], { type: "application/pdf" }), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition":
              'inline; filename="charles-lowell-cv.pdf"',
          },
        });
      } finally {
        yield* call(() => browser.close());
      }
    },
  };
}
