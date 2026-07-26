import type { JSXElement } from "revolution/jsx-runtime";
import { selectedWork } from "../../content/cv.tsx";

export function CvSelectedWork(): JSXElement {
  return (
    <section class="mb-16">
      <h2 class="text-3xl heading-rule">Selected Work</h2>
      <p class="text-sm text-muted mb-6 -mt-4">
        Original projects I created and led.
      </p>
      <ul class="list-none p-0">
        {selectedWork.map((project) => (
          <li class="mb-10 cv-item">
            <h3 class="text-2xl mb-1 flex items-center gap-3">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt=""
                  width={28}
                  height={28}
                  class="flex-shrink-0"
                />
              ) : <></>}
              <a href={project.href}>{project.name}</a>
            </h3>
            <p class="text-sm text-muted mb-2">{project.skill}</p>
            <ul class="list-none p-0 mb-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li class="text-xs px-2 py-0.5 border border-rule rounded">
                  {tech}
                </li>
              ))}
            </ul>
            <p>{project.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
