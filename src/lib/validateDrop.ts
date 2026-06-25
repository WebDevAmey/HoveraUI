const MAX_SOURCE_LENGTH = 20_000;
const MAX_NOTE_LENGTH = 600;
const MAX_NAME_LENGTH = 80;
const MAX_TAGS = 6;

// Defense in depth only. The real security boundary is the sandboxed iframe
// (sandbox="allow-scripts" without allow-same-origin) plus its CSP, not this
// list, since a determined submitter can always obfuscate these patterns.
const DENYLIST_PATTERNS = [
  /<script[^>]*\ssrc\s*=\s*["'](?!https:\/\/cdn\.tailwindcss\.com)/i,
  /\bfetch\s*\(/i,
  /\bXMLHttpRequest\b/i,
  /\bWebSocket\b/i,
  /\bnavigator\.sendBeacon\b/i,
  /\bdocument\.cookie\b/i,
  /\bwindow\.parent\b/i,
  /\bwindow\.top\b/i,
];

export interface DropSubmission {
  name: string;
  category: string;
  tags: string[];
  sourceCode: string;
  makerNote: string;
  behaviorNote: string;
}

export function validateDropSubmission(input: DropSubmission): string | null {
  if (!input.name.trim() || input.name.length > MAX_NAME_LENGTH) {
    return `Name must be between 1 and ${MAX_NAME_LENGTH} characters.`;
  }
  if (!input.category.trim()) {
    return "Category is required.";
  }
  if (input.tags.length > MAX_TAGS) {
    return `Use at most ${MAX_TAGS} tags.`;
  }
  if (!input.sourceCode.trim() || input.sourceCode.length > MAX_SOURCE_LENGTH) {
    return `Source code must be between 1 and ${MAX_SOURCE_LENGTH} characters.`;
  }
  if (!input.makerNote.trim() || input.makerNote.length > MAX_NOTE_LENGTH) {
    return `Maker note must be between 1 and ${MAX_NOTE_LENGTH} characters.`;
  }
  if (!input.behaviorNote.trim() || input.behaviorNote.length > MAX_NOTE_LENGTH) {
    return `Behavior note must be between 1 and ${MAX_NOTE_LENGTH} characters.`;
  }
  for (const pattern of DENYLIST_PATTERNS) {
    if (pattern.test(input.sourceCode)) {
      return "Source code contains a pattern that is not allowed in drops.";
    }
  }
  return null;
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
