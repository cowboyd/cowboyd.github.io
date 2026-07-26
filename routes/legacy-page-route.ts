import { call } from "effection";
import type { HTTPMiddleware } from "revolution";

// Serves a single static HTML file from the legacy/ directory (the pre-2019
// hand-crafted pages that used to live at cowboyd.github.io). Deliberately NOT
// in the sitemap and returns X-Robots-Tag: noindex — the pages are preserved
// at their original URLs for anyone who bookmarked them, not for search.
// staticalize doesn't crawl them; a post-build `cp` copies legacy/ → built/
// verbatim (see the "staticalize" task in deno.json).
export function legacyPageRoute(file: string): HTTPMiddleware {
  return function* () {
    let bytes = yield* call(() =>
      Deno.readFile(new URL(`../legacy/${file}`, import.meta.url))
    );
    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  };
}
