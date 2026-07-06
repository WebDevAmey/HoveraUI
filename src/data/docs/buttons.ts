import type { ComponentDocEntry } from "@/types/docs";
import { buttons } from "@/data/button";
import { classifyStack } from "@/lib/classify-stack";

function usageFor(slug: string, componentName: string) {
  return `import ${componentName} from "@/components/ui/${slug}"\n\nexport function ${componentName}Demo() {\n  return <${componentName}>Get Started</${componentName}>\n}`;
}

const STORIES: Record<string, string> = {
  "magnetic-button": "The button leans toward your cursor before you reach it and springs back the moment you leave, the most literal form of an interface meeting you halfway.",
  "glow-button": "Hover and the button lifts slightly while a violet glow blooms outward, signaling that this is the action to take.",
  "border-reveal": "The border is invisible at rest and snaps to white on hover, a minimal cue that costs nothing until the user reaches for it.",
  "ripple-button": "A click sends a circular ripple expanding from the center, the same physical metaphor as water responding to touch.",
  "3d-button": "Hover lifts the button up on the y-axis with a deeper shadow, then presses back down on click, like a real key.",
  "neon-swipe-button": "A gradient sweeps in from the left on hover, indigo into purple into pink, like a neon sign warming up.",
  "swipe-button": "The same swipe-in gradient as Neon Swipe, paired with a lift and slight scale so the hover feels more physical.",
  "new-button": "A simple lift on hover with a deepening shadow, confident and understated.",
  "luminance-flux-button": "Hover triggers a blurred gradient sliding across the surface and a soft glow building behind it, like light flexing under glass.",
  "frosted-glass-button": "A frosted, blurred glass surface that brightens and scales up slightly on hover, like fog clearing off cold glass.",
  "neumorphic-button": "Soft dual shadows give the button a raised, pillowy look at rest, then invert inward on press to read as physically depressed.",
  "read-more-button": "A pink glow intensifies behind frosted glass on hover while a diagonal sheen slides across, inviting a click to continue.",
  "shimmer-swipe-button": "A bright diagonal shimmer sweeps left to right on hover, the same gesture as light catching a moving surface.",
  "link-button": "Hover slides a gradient across the text itself until it reads transparent against the gradient, the link revealing its own color shift.",
  "slide-text-button": "The label slides out to the left while an identical copy slides in from the right, a text relay rather than a fade.",
  "gradient-link-button": "The text is gradient-filled from the start, hover shifts the gradient position so the color itself appears to travel.",
  "underline-hover-button": "An underline scales in from the left origin on hover, a quiet, classic link affordance.",
  "slide-fill-button": "A green fill slides up from below the border on hover, like the button getting filled from the bottom.",
  "blob-hover-button": "Two blurred blob shapes rise and morph behind the text on hover, replacing the flat border with an organic teal wash.",
  "liquid-fill-button": "Two layered blob shapes rise and rotate into place on hover, simulating liquid filling the button from below.",
  "split-curtain-button": "Two color panels slide in diagonally from opposite corners on hover, meeting in the middle like curtains closing.",
  "radial-bloom-button": "A small dot at the center scales up dramatically on hover, blooming outward until it fills the whole button.",
  "x-ray-scanner-button": "A white scan line rises from the bottom on hover using mix-blend-difference, inverting the text it passes through.",
  "chamber-door-button": "Hover splits the button into two halves that rotate open on a 3D x-axis, like a chamber door swinging apart.",
  "shredder-button": "Two clipped copies of the label slide in opposite vertical directions on hover, as if the text were sliced and pulled apart.",
  "outline-button": "A simple outlined button that scales up slightly and switches to orange on hover, deliberately understated.",
  "morse-signal-button": "Five bars light up in a staggered sequence on hover, each with its own delay, reading like a signal being transmitted.",
  "scan-ring-button": "Four concentric rings expand outward in sequence on hover, like a radar pulse emanating from the button.",
  "eclipse-button": "A dark circle slides across the button on hover, partially eclipsing the amber surface beneath it.",
  "tally-strike-button": "Four small marks rise into view on hover like tally strikes being drawn, each with a slightly different delay.",
  "compass-lock-button": "A needle rotates from 20 to 200 degrees on hover, like a compass swinging to find a new bearing.",
  "pulse-seismograph-button": "The label fades out on hover and a row of bars rises and falls at different heights, mimicking a seismograph reading.",
  "rivet-press-button": "Four corner rivets light up amber in sequence on hover, like a panel powering on rivet by rivet.",
  "hover-arrow-button": "The label slides out to the right and fades as an arrow slides in to replace it, suggesting forward motion.",
  "press-button": "A solid drop shadow collapses to nothing when pressed, so the button visually sinks under the click.",
  "play-now-button": "A cool gradient with a wide glow on hover, sized and weighted like a primary action on a game or media card.",
  "rose-border-button": "Hover brightens the whole button and shifts the border emphasis from bottom to top, a subtle weight shift.",
  "violet-border-button": "The same bottom-to-top border weight shift as Rose Border Button, in violet instead of rose.",
};

// glow-button is migrated separately in ./glow-button.ts (the original worked example).
export const buttonDocs: ComponentDocEntry[] = buttons
  .filter((btn) => btn.slug !== "glow-button")
  .map((btn) => {
    const componentName = btn.name.replace(/[^a-zA-Z0-9]/g, "");

    return {
      slug: btn.slug,
      name: btn.name.trim(),
      description: `A hover-driven ${btn.category} button, ${btn.name.trim().toLowerCase()}.`,
      category: "buttons",
      stack: classifyStack(btn.code),
      story: STORIES[btn.slug],
      Preview: btn.component as React.ComponentType,
      code: btn.code,
      usage: usageFor(btn.slug, componentName),
      dependencies: btn.dependencies ?? [],
      props: [],
      needsLightPreview: btn.needsLightPreview,
    };
  });
