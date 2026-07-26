import type { SitemapRoute } from "../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";

export function blogIndexRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate(), priority: 0.5 }];
    },
    handler: function* () {
      let AppHtml = yield* useAppHtml({
        title: "Blog — cogentdude",
        description: "Writing by Charles Lowell.",
      });

      return (
        <AppHtml>
          <article class="mx-auto max-w-prose px-6 py-16">
            <h1 class="text-4xl mb-6">Blog</h1>
            <p>
              Nothing posted here yet. Writing lives on{" "}
              <a href="https://frontside.com/blog/">
                the Frontside blog
              </a>{" "}
              in the meantime.
            </p>
          </article>
        </AppHtml>
      );
    },
  };
}
