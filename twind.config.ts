import { defineConfig } from "npm:@twind/core@1.1.3";
import presetTailwind from "npm:@twind/preset-tailwind@1.1.4";
import presetTypography from "npm:@twind/preset-typography@1.0.7";

export const config = defineConfig({
  //@ts-expect-error the tailwind preset types are wiggity whack.
  presets: [presetTailwind(), presetTypography(), presetCogent()],
  theme: {
    fontFamily: {
      serif: [
        '"Instrument Serif"',
        "Georgia",
        "serif",
      ],
      mono: [
        '"JetBrains Mono"',
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "monospace",
      ],
    },
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#1A1A1A",
        rule: "#E5E2DA",
        accent: "#B85C38",
        muted: "#6B6B6B",
      },
      maxWidth: {
        prose: "70ch",
      },
    },
  },
  preflight: {
    'html, body': {
      'background-color': '#FAFAF7',
      'color': '#1A1A1A',
      'font-family': '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      'font-size': '16px',
      'line-height': '1.65',
    },
    'h1, h2, h3, h4, h5, h6': {
      'font-family': '"Instrument Serif", Georgia, serif',
      'line-height': '1.15',
      'font-weight': '400',
    },
    'a': {
      'color': '#B85C38',
      'text-decoration': 'underline',
      'text-decoration-thickness': '1px',
      'text-underline-offset': '2px',
    },
    'a:hover': {
      'text-decoration-thickness': '2px',
    },
    '@media print': {
      '@page': {
        size: 'Letter',
        margin: '0.6in',
      },
      'html, body': {
        'background': 'white',
        'color': 'black',
        'font-size': '10.5pt',
        'line-height': '1.45',
        '-webkit-print-color-adjust': 'exact',
        'print-color-adjust': 'exact',
      },
      // .cv-download hides the "Download PDF" span; footer hides the site footer.
      // The top-nav header is already suppressed on /cv via showNav=false.
      '.cv-download, footer': {
        'display': 'none',
      },
      '.cv-item': {
        'break-inside': 'avoid',
      },
      'h1, h2, h3': {
        'break-after': 'avoid',
      },
      'a': {
        'color': '#B85C38',
      },
    },
  },
});

function presetCogent() {
  return {
    rules: [
      // rule for the accent underline beneath section headings
      ["heading-rule", {
        "border-bottom": "1px solid #B85C38",
        "padding-bottom": "0.5rem",
        "margin-bottom": "1.5rem",
      }],
    ],
    theme: {},
  };
}
