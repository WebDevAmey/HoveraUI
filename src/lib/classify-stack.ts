/**
 * Classifies a component's Code-tab source as "css" or "tailwind".
 * Inline `style={...}` is what actually drives the look for gradients/positions
 * that utility classes can't express, so its presence outweighs any Tailwind
 * classes used alongside it.
 */
export function classifyStack(code: string): "css" | "tailwind" {
  return code.includes("style={") ? "css" : "tailwind";
}
