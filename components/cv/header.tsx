import type { JSXElement } from "revolution/jsx-runtime";
import { contact } from "../../content/cv.tsx";

export function CvHeader(): JSXElement {
  return (
    <header class="mb-16">
      <h1 class="text-5xl md:text-6xl mb-3">{contact.name}</h1>
      <p class="text-base text-muted mb-4">{contact.positioning}</p>
      <p class="text-sm">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {" · "}
        <a href={contact.github}>github.com/cowboyd</a>
        {" · "}
        <a href={contact.site}>cogentdude.com</a>
        <span class="cv-download"> · <a href="/cv.pdf">PDF</a></span>
      </p>
    </header>
  );
}
