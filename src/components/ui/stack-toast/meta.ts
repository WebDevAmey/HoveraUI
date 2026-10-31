import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "stack-toast",
  name: "Stack Toast",
  description: "Glass toasts that stack with depth, newest in front, and fan out into a list on hover or focus",
  category: "feedback",
  material: "Glass",
  exports: ["Toaster", "useToaster", "createToaster", "toast"],
  props: [
    { name: "toaster", type: "ToasterStore", default: "shared store", description: "Store to read from. Use useToaster() for a store owned by one component, or omit it and call toast()." },
    { name: "position", type: '"bottom-right" | "bottom-center" | "bottom-left"', default: '"bottom-right"', description: "Corner the stack grows from." },
    { name: "contained", type: "boolean", default: "false", description: "Positions inside the nearest positioned ancestor instead of the viewport." },
    { name: "visible", type: "number", default: "3", description: "Cards visible in the collapsed stack. Older ones wait behind." },
    { name: "label", type: "string", default: '"Notifications"', description: "Accessible name of the region." },
    { name: "toast(title, options)", type: "{ description?, tone?: \"neutral\" | \"success\", action?: { label, onClick }, duration? }", description: "Fires a toast and returns its id. Duration defaults to 5000ms; Infinity keeps it." },
    { name: "dismiss(id)", type: "(id: number) => void", description: "Removes a toast with its exit animation." },
    { name: "...props", type: "HTMLAttributes<HTMLElement>", description: "Passed to the region element." },
  ],
  usage: `import { Toaster, useToaster } from "@/components/ui/stack-toast/stack-toast";

function Editor() {
  const toaster = useToaster();
  return (
    <>
      <button onClick={() => toaster.toast("Saved", { tone: "success" })}>Save</button>
      <Toaster toaster={toaster} />
    </>
  );
}

// Or app-wide: render <Toaster /> once and call toast("Saved") anywhere.`,
  accessibility: [
    "The stack is a region named Notifications; each toast is a polite status, so screen readers announce it without moving focus.",
    "Hovering or focusing the stack fans it into a list and pauses every timer; timers also pause while the tab is hidden.",
    "Tab reaches the action and close buttons; Escape dismisses the newest toast.",
    "On touch, swipe a toast sideways to dismiss it, or use the close button.",
    "With reduced motion cards move instantly and only fade in and out.",
  ],
  variants: [
    { name: "Neutral", description: "Title and a short line." },
    { name: "Success", description: "A phosphor dot marks a completed action." },
    { name: "Action", description: "An inline Undo that dismisses the toast when used." },
  ],
};

export default meta;
