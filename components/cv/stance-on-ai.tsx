import type { JSXElement } from "revolution/jsx-runtime";
import { stanceOnAI } from "../../content/cv.tsx";

export function CvStanceOnAI(): JSXElement {
  return (
    <section class="mb-16">
      <h2 class="text-3xl heading-rule">Stance on AI</h2>
      <p>{stanceOnAI}</p>
    </section>
  );
}
