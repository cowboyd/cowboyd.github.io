import type { JSXElement } from "revolution/jsx-runtime";
import { experience } from "../../content/cv.tsx";

export function CvExperience(): JSXElement {
  return (
    <section class="mb-16">
      <h2 class="text-3xl heading-rule">Employment</h2>
      <ul class="list-none p-0">
        {experience.map((role) => (
          <li class="mb-8 cv-item">
            <h3 class="text-2xl mb-1">
              {role.href
                ? <a href={role.href}>{role.company}</a>
                : role.company}
            </h3>
            <p class="text-sm text-muted mb-2">
              {role.title}
              {role.start ? (
                <span> · {role.start}{role.end ? `–${role.end}` : ""}</span>
              ) : <></>}
            </p>
            <p>{role.prose}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
