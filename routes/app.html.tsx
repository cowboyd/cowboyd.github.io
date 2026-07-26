import type { Operation } from "effection";
import type { JSXChild, JSXElement } from "revolution";

import {
  useAbsoluteUrl,
  useCurrentRequest,
} from "../plugins/current-request.ts";

export interface Options {
  title: string;
  description: string;
  ogImage?: string;
  showNav?: boolean;
}

export function* useAppHtml(
  options: Options,
): Operation<({ children }: { children: JSXChild }) => JSXElement> {
  let { title, description, showNav = true } = options;
  let request = yield* useCurrentRequest();
  let url = new URL(request.url);
  let ogURL = yield* useAbsoluteUrl(url.pathname);
  let ogImageMeta = options.ogImage
    ? yield* useAbsoluteUrl(options.ogImage)
    : undefined;

  return function AppHtml({ children }): JSX.Element {
    return (
      <html lang="en-US" dir="ltr">
        <head>
          <meta charset="UTF-8" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="author" content="Charles Lowell" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={ogURL} />
          {ogImageMeta
            ? <meta name="image" property="og:image" content={ogImageMeta} />
            : <></>}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&display=swap"
          />
          <link rel="icon" href="/assets/favicon.png?v=2" type="image/png" />
          <link rel="canonical" href={ogURL} />
        </head>
        <body class="bg-paper text-ink">
          {showNav ? (
            <header class="mx-auto max-w-prose px-6 pt-8 flex justify-between text-sm">
              <a href="/" class="no-underline text-ink font-mono">
                cogentdude
              </a>
              <nav class="flex gap-x-6">
                <a href="/cv">CV</a>
                <a href="https://github.com/cowboyd">GitHub</a>
              </nav>
            </header>
          ) : <></>}
          <main>{children}</main>
          <footer class="mx-auto max-w-prose px-6 pb-8 pt-8 text-xs text-muted">
            <p>
              source for{" "}
              <a href="https://github.com/cowboyd/cogentdude.com">
                this site on github.com
              </a>
            </p>
          </footer>
        </body>
      </html>
    );
  };
}
