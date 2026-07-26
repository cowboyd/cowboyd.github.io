import type { JSXElement } from "revolution/jsx-runtime";
import { education } from "../../content/cv.tsx";

export function CvEducation(): JSXElement {
  return (
    <section class="mb-16">
      <h2 class="text-3xl heading-rule">Education</h2>
      <ul class="list-none p-0">
        {education.map((entry) => (
          <li class="mb-6 cv-item">
            <h3 class="text-2xl mb-1">{entry.institution}</h3>
            <p class="text-sm text-muted mb-1">
              {entry.credential} · {entry.year}
            </p>
            {entry.note ? <p>{entry.note}</p> : <></>}
          </li>
        ))}
      </ul>
    </section>
  );
}
