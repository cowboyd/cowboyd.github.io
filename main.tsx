import { main, suspend } from "effection";

import { createRevolution, route as $route } from "revolution";
import { route, sitemapPlugin } from "./plugins/sitemap.ts";
import { etagPlugin } from "./plugins/etag.ts";
import { currentRequestPlugin } from "./plugins/current-request.ts";
import { twindPlugin } from "./plugins/twind.ts";
import { config } from "./twind.config.ts";

import { assetsRoute } from "./routes/assets-route.ts";
import { indexRoute } from "./routes/index.tsx";
import { cvRoute } from "./routes/cv.tsx";
import { cvPdfRoute } from "./routes/cv-pdf.ts";
import { blogIndexRoute } from "./routes/blog-index.tsx";
import { legacyPageRoute } from "./routes/legacy-page-route.ts";
import { faviconRoute } from "./routes/favicon-route.ts";
import { robotsRoute } from "./routes/robots-route.ts";

await main(function* (args) {
  let _dev = !!args.includes("--dev");

  let revolution = createRevolution({
    app: [
      route("/", indexRoute()),
      route("/cv", cvRoute()),
      route("/cv.pdf", cvPdfRoute()),
      route("/blog", blogIndexRoute()),
      $route("/favicon.png", faviconRoute()),
      $route("/favicon.ico", faviconRoute()),
      $route("/robots.txt", robotsRoute()),
      $route("/assets(.*)", assetsRoute("assets")),
      // Legacy content from cowboyd.github.io. Deliberately out of the sitemap
      // and Disallow'd in robots.txt; preserved at original paths for anyone
      // who bookmarked them, not for search.
      $route("/hat.html", legacyPageRoute("hat.html")),
      $route(
        "/checked-vs-unchecked.html",
        legacyPageRoute("checked-vs-unchecked.html"),
      ),
      $route("/images(.*)", assetsRoute("legacy/images", "images")),
    ],
    plugins: [
      etagPlugin(),
      currentRequestPlugin(),
      sitemapPlugin(),
      twindPlugin({ config }),
    ],
  });

  let port = Number(Deno.env.get("PORT") ?? 8005);
  let server = yield* revolution.start({ port });
  let hostname = server.hostname === "0.0.0.0" ? "localhost" : server.hostname;
  console.log(`www -> http://${hostname}:${server.port}`);

  yield* suspend();
});
