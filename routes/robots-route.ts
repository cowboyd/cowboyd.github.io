import type { HTTPMiddleware } from "revolution";

const robotsTxt = [
  "User-agent: *",
  "Disallow: /hat.html",
  "Disallow: /checked-vs-unchecked.html",
  "Disallow: /images/",
  "",
  "Sitemap: https://cogentdude.com/sitemap.xml",
  "",
].join("\n");

export function robotsRoute(): HTTPMiddleware {
  return function* () {
    return new Response(robotsTxt, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  };
}
