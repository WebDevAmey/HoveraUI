import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "morph-button",
  name: "Morph Button",
  description: "A button whose label lifts away and the next one settles in, from idle to loading to done, without changing size",
  category: "essentials",
  material: "Essential",
  exports: ["MorphButton"],
  props: [
    { name: "variant", type: '"solid" | "outline" | "ghost"', default: '"solid"', description: "Visual weight. Keep one solid button per view for the main action." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "32, 40 or 48px tall." },
    { name: "state", type: '"idle" | "loading" | "done"', default: '"idle"', description: "Which label shows. Drive it from your request: loading while it runs, done when it lands." },
    { name: "loadingLabel", type: "ReactNode", default: '"Working"', description: "Shown with a spinner while loading. Name what is happening, such as Deploying." },
    { name: "doneLabel", type: "ReactNode", default: '"Done"', description: "Shown with a drawn check when done. Use the past tense of the action, such as Deployed." },
    { name: "icon", type: "ReactNode", description: "Optional leading icon on the idle face." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button." },
  ],
  usage: `import { MorphButton } from "@/components/ui/morph-button/morph-button";

const [state, setState] = useState<"idle" | "loading" | "done">("idle");

<MorphButton
  state={state}
  loadingLabel="Deploying"
  doneLabel="Deployed"
  onClick={async () => {
    setState("loading");
    await deploy();
    setState("done");
  }}
>
  Deploy
</MorphButton>`,
  accessibility: [
    "A native button, so Enter and Space work and it keeps its place in the tab order through every state.",
    "Inactive faces are aria-hidden, and a visually hidden status region announces the loading and done labels as they change.",
    "aria-busy is set while loading, and the cursor shows progress.",
    "Press feedback and hover changes are gated: hover only applies on fine pointers, and reduced motion swaps the lift and blur for a plain crossfade.",
  ],
  variants: [
    { name: "Solid", description: "Ink fill with a faint top highlight, for the one main action." },
    { name: "Outline", description: "Raised surface with a hairline, for secondary actions." },
    { name: "Ghost", description: "No chrome until hover, for dismissive actions." },
  ],
};

export default meta;
