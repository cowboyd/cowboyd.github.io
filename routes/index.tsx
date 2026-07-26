import type { SitemapRoute } from "../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";
import { contact, intro } from "../content/cv.tsx";

export function indexRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate(), priority: 1.0 }];
    },
    handler: function* () {
      let AppHtml = yield* useAppHtml({
        title: "Charles Lowell — cogentdude",
        description: contact.positioning,
      });

      return (
        <AppHtml>
          <article class="mx-auto max-w-prose px-6 py-16">
            <h1 class="text-5xl md:text-7xl mb-6">{contact.name}</h1>
            <p class="text-lg text-muted mb-10">{contact.positioning}</p>
            <p class="mb-10">{intro[0]}</p>
            <p>
              <a href="/cv">Read the full CV</a>
              {" · "}
              <a href="/cv.pdf">PDF</a>
              {" · "}
              <a href={contact.github}>GitHub</a>
            </p>
          </article>
        </AppHtml>
      );
    },
  };
}
