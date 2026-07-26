import type { JSXElement } from "revolution/jsx-runtime";
import { contact, essays, podcasts, talks } from "../../content/cv.tsx";

export function CvSpeaking(): JSXElement {
  return (
    <section class="mb-16">
      <h2 class="text-3xl heading-rule">Speaking & Writing</h2>

      <h3 class="text-lg mb-2">Selected essays</h3>
      <ul class="list-none p-0 mb-2">
        {essays.map((essay) => (
          <li class="mb-2 cv-item">
            <a href={essay.href}>{essay.title}</a>
            <span class="text-muted"> ({essay.year})</span>
          </li>
        ))}
      </ul>
      <p class="text-sm mb-6">
        <a href={contact.frontside}>See all →</a>
      </p>

      <h3 class="text-lg mb-2">Talks & interviews</h3>
      <ul class="list-none p-0 mb-6">
        {talks.map((talk) => (
          <li class="mb-2 cv-item">
            <a href={talk.href}>{talk.venue}</a>
             — {talk.title}
            <span class="text-muted"> ({talk.year})</span>
          </li>
        ))}
      </ul>

      <h3 class="text-lg mb-2">Podcasts</h3>
      <ul class="list-none p-0">
        {podcasts.map((pod) => (
          <li class="mb-2 cv-item">
            <a href={pod.href}>{pod.title}</a>
            <span class="text-muted"> — {pod.role}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
