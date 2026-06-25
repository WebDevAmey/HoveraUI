/**
 * Builds the srcdoc for a sandboxed drop preview. Submitted code is treated as
 * plain HTML with Tailwind classes (not JSX or React) so the sandbox never
 * needs a JSX transpiler or a React runtime, which would only grow the
 * attack surface inside untrusted content.
 *
 * The iframe itself must be rendered with sandbox="allow-scripts" only, never
 * combined with allow-same-origin, so this document gets a unique opaque
 * origin no matter where it is served from. The CSP meta tag below is
 * defense in depth on top of that, not the actual security boundary.
 */
export function buildSandboxSrcDoc(sourceCode: string): string {
  const escapedSourceCode = sourceCode.replace(/<\/script>/gi, "<\\/script>");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; frame-src 'none'; form-action 'none';" />
<script src="https://cdn.tailwindcss.com"></script>
<style>html,body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:transparent;font-family:system-ui,sans-serif;}</style>
</head>
<body>
${escapedSourceCode}
</body>
</html>`;
}
