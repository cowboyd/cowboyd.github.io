import type { JSXElement } from "revolution/jsx-runtime";
import { intro } from "../../content/cv.tsx";

export function CvIntro(): JSXElement {
  return (
    <section class="mb-16">
      {intro.map((paragraph) => (
        <p class="mb-4">{paragraph}</p>
      ))}
    </section>
  );
}
