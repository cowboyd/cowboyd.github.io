import type { JSXElement } from "revolution/jsx-runtime";

export interface Project {
  name: string;
  href: string;
  logo?: string;
  skill: string;
  stack: string[];
  blurb: string | JSXElement;
}

export interface Role {
  company: string;
  title: string;
  start?: string;
  end?: string;
  href?: string;
  prose: string;
}

export interface Talk {
  venue: string;
  title: string;
  href: string;
  year: number;
}

export interface Essay {
  title: string;
  href: string;
  year: number;
}

export interface Education {
  institution: string;
  credential: string;
  year: number;
  note?: string;
}

export const contact = {
  name: "Charles Lowell",
  positioning:
    "Student of Software: structured programming, functional programing, developer experience that feels like flying.",
  email: "cowboyd@cogentdude.com",
  github: "https://github.com/cowboyd",
  site: "https://cogentdude.com",
  frontside: "https://frontside.com/people/charles-lowell/",
};

export const intro: string[] = [
  "I use computation to solve problems from the outside in, while always understanding the system from the inside out. Program semantics follow program text.",
];

export const stanceOnAI: string =
  "AI has not changed the fundamental physics of software quality; only the masses involved. Instead of launching rocks, we're now hurling planets. As such, precision in software structure and comprehension of the mechanics involved are more important than ever.";

export const selectedWork: Project[] = [
  {
    name: "Effection",
    href: "https://frontside.com/effection/",
    logo: "/assets/projects/effection.svg",
    skill: "Structured concurrency and effects",
    stack: ["TypeScript", "Delimited Continuations", "Algebraic Effects"],
    blurb: (
      <>
        The lifetime of every async operation is bounded by a scope so that
        cancellation, cleanup, and error propagation happen automatically. Based
        on delimited continuations, originally derived by{" "}
        <a href="https://github.com/cowboyd/delimited-continuations-tutorial">
          translation of OCaml shift and reset primitives
        </a>.
      </>
    ),
  },
  {
    name: "Bombshell Terminal",
    href: "https://github.com/bombshell-dev/tty",
    logo: "/assets/projects/bombshell.svg",
    skill: "Layout engine for terminal emulators",
    stack: ["C", "WASM", "Terminal I/O", "TTY Protocols"],
    blurb:
      "Brings the box model, flex-like flow, z-index compositing, and animations to text-mode UIs.",
  },
  {
    name: "The Ruby Racer",
    href: "https://github.com/rubyjs/therubyracer",
    logo: "/assets/projects/therubyracer.svg",
    skill: "Embedded interpreter",
    stack: ["Ruby", "C++", "V8", "Native Extensions", "FFI"],
    blurb:
      "Embeds the V8 JavaScript engine inside Ruby. For the entire Rails-asset-pipeline era this was how Ruby apps ran JS at build and request time; it was a foundational gem that required an intimate knowledge of both interpreters and how to share memory between them.",
  },
  {
    name: "Simulacrum",
    href: "https://github.com/thefrontside/simulacrum",
    logo: "/assets/projects/simulacrum.svg",
    skill: "Service simulation",
    stack: ["Simulation", "HTTP", "TypeScript"],
    blurb:
      "Run an application against simulated HTTP services that speak the same protocol as the vendor you'd otherwise stub out, so it exercises the same code paths as production does. Ships simulators for GitHub, LDAP, and advanced OAuth flows out of the box.",
  },
  {
    name: "Interactors",
    href: "https://frontside.com/interactors",
    logo: "/assets/projects/interactors.svg",
    skill: "Semantic user actions, not selectors.",
    stack: ["Acceptance Testing", "Page Objects", "Browser", "DOM"],
    blurb:
      "Composable page objects for actuating components via semantic action. This lets agents control a web interface with a semantic control language rather than a mish-mash of DOM selectors and timing hacks.",
  },
];

export const experience: Role[] = [
  {
    company: "Frontside Software",
    title: "Founder, Head of R&D",
    start: "2005",
    end: "present",
    href: "https://frontside.com",
    prose:
      "Founded Frontside on the premise that the patterns of software quality and architecture are universal and apply just as much to the frontend as to the backend. Over two decades we have provided custom software solutions to Fortune 500 companies for the most challenging problems faced by their development teams.",
  },
  {
    company: "ThoughtWorks, LLC",
    title: "Software Consultant",
    start: "2000",
    end: "2003",
    href: "https://www.thoughtworks.com/",
    prose:
      "Consulted on Java and Ruby engagements during the years when Agile and XP were still an argument, not a certification.",
  },
  {
    company: "FundsXpress, LLC",
    title: "Founding Programmer",
    start: "1996",
    end: "1999",
    href: "https://www.apiture.com/",
    prose:
      "I was the second programmer hired at FundsXpress, an Austin startup founded in 1996 to build web-based retail and business banking software for community banks (in an era when the phrase \"internet banking\" was itself still novel). I worked to implement their backend, billpay system, and frontend.",
  },
];

export const talks: Talk[] = [
  {
    venue: "devtools.fm ep. 134",
    title: "Structured concurrency & Effection",
    href: "https://www.devtools.fm/episode/134",
    year: 2025,
  },
  {
    venue: "Learn With Jason",
    title: "Fixing async / await",
    href: "https://www.learnwithjason.dev/",
    year: 2024,
  },
  {
    venue: "JavaScript Jabber #337",
    title: "Microstates",
    href: "https://devchat.tv/js-jabber/",
    year: 2019,
  },
  {
    venue: "EmberConf",
    title: "Immutability & composable components",
    href: "https://emberconf.com/",
    year: 2016,
  },
];

export const essays: Essay[] = [
  {
    title: "The await event horizon in JavaScript",
    href: "https://frontside.com/blog/2023-12-11-await-event-horizon",
    year: 2023,
  },
  {
    title: "What is Strict Structured Concurrency?",
    href:
      "https://frontside.com/effection/blog/2026-04-07-strict-structured-concurrency/",
    year: 2026,
  },
  {
    title: "RYE: Repeat Yourself Enough",
    href: "https://frontside.com/blog/2009-06-29-rye-repeat-yourself-enough",
    year: 2009,
  },
  {
    title: "Math is Just Another Framework",
    href:
      "https://frontside.com/blog/2018-02-19-math-is-just-another-framework",
    year: 2018,
  },
];

export interface Podcast {
  title: string;
  href: string;
  role: string;
}

export const podcasts: Podcast[] = [
  {
    title: "The Frontside Podcast",
    href: "https://frontside.com/podcast/",
    role: "host / co-host, 100+ episodes",
  },
  {
    title: "Drunk and Retired",
    href: "https://archive.org/details/DrunkAndRetired",
    role: "co-host with Michael Coté, mid-to-late 2000s",
  },
];

export const education: Education[] = [
  {
    institution: "University of Michigan",
    credential: "BS, Computer Science & Linguistics",
    year: 2006,
    note: "4.0 GPA in major",
  },
  {
    institution: "LBJ Science Academy, Austin, TX",
    credential: "High School Diploma",
    year: 1994,
  },
];

export const colophon = {
  fonts: "Instrument Serif and JetBrains Mono, served by Google Fonts",
  stack: "Deno, revolution, Twind, staticalize",
  sourceHref: "https://github.com/cowboyd/cogentdude.com",
};
