import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "stepped-otp",
  name: "Stepped OTP",
  description: "A one-time code field whose digits tick into their slots in three discrete steps, like a counter wheel",
  category: "inputs",
  material: "Mechanical",
  exports: ["SteppedOtp"],
  props: [
    { name: "length", type: "number", default: "6", description: "Number of digit slots. Even lengths of 6 or more get a centre gap." },
    { name: "value", type: "string", description: "Controlled value (digits only)." },
    { name: "defaultValue", type: "string", default: '""', description: "Initial value when uncontrolled." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called with the sanitised digits on every change." },
    { name: "onComplete", type: "(code: string) => void", description: "Called when every slot is filled, including by paste or autofill." },
    { name: "label", type: "ReactNode", default: '"Verification code"', description: "Visible label tied to the input." },
    { name: "status", type: '"idle" | "error" | "success"', default: '"idle"', description: "Error sets aria-invalid, tints the slots and gives one short shake; success inks the digits in the accent." },
    { name: "message", type: "ReactNode", description: "Helper, error or success text below the slots. Linked with aria-describedby and announced politely." },
    { name: "disabled", type: "boolean", description: "Disables the input." },
    { name: "autoFocus", type: "boolean", description: "Focuses the input on mount." },
    { name: "name", type: "string", description: "Form field name for the underlying input." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root element." },
  ],
  usage: `import { SteppedOtp } from "@/components/ui/stepped-otp/stepped-otp";

<SteppedOtp
  status={error ? "error" : "idle"}
  message={error ?? "Sent to the phone ending 0142."}
  onComplete={verify}
/>`,
  accessibility: [
    "One real, labelled input carries the code, with autocomplete=\"one-time-code\" and a numeric keyboard, so autofill, paste and screen readers work as with any text field.",
    "Typing advances, Backspace deletes, Left, Right, Home and End move between slots; the active slot is outlined and shows a caret.",
    "Errors are never shake-only: the input is marked aria-invalid and the message text, linked by aria-describedby, is announced politely.",
    "With reduced motion digits appear in place and the error shake and caret blink are off.",
  ],
  variants: [
    { name: "Idle", description: "Hairline slots with a split-flap seam." },
    { name: "Error", description: "Oxblood slots, one shake and an explanatory message." },
    { name: "Success", description: "Digits ink in the accent." },
  ],
};

export default meta;
