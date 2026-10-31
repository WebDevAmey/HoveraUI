import { codeToHtml } from "shiki";

export type Lang = "tsx" | "ts" | "css" | "bash";

/** Guess the grammar from a file name or block title. */
export function langFor(name = ""): Lang {
  if (/\.css$/.test(name)) return "css";
  if (/\.ts$/.test(name)) return "ts";
  if (/\.tsx$/.test(name)) return "tsx";
  if (/terminal|shell/i.test(name)) return "bash";
  return "tsx";
}

/**
 * Highlight at build time with both themes baked in as CSS variables; globals.css
 * picks the pair that matches the page theme, so there is no client-side work.
 */
export function highlight(code: string, lang: Lang) {
  return codeToHtml(code, {
    lang,
    themes: { light: "vitesse-light", dark: "vitesse-dark" },
    defaultColor: false,
  });
}
