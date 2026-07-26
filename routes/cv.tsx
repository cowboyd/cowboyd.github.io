import type { SitemapRoute } from "../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";
import { contact } from "../content/cv.tsx";
import { CvHeader } from "../components/cv/header.tsx";
import { CvIntro } from "../components/cv/intro.tsx";
import { CvStanceOnAI } from "../components/cv/stance-on-ai.tsx";
import { CvSelectedWork } from "../components/cv/selected-work.tsx";
import { CvExperience } from "../components/cv/experience.tsx";
import { CvSpeaking } from "../components/cv/speaking.tsx";
import { CvEducation } from "../components/cv/education.tsx";

export function cvRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate(), priority: 0.9 }];
    },
    handler: function* () {
      let AppHtml = yield* useAppHtml({
        title: `${contact.name} — CV`,
        description: contact.positioning,
        showNav: false,
      });

      return (
        <AppHtml>
          <article class="mx-auto max-w-prose px-6 py-16 cv-root">
            <CvHeader />
            <CvStanceOnAI />
            <CvSelectedWork />
            <CvSpeaking />
            <CvExperience />
            <CvEducation />
          </article>
        </AppHtml>
      );
    },
  };
}
