import type { ComponentDocEntry } from "@/types/docs";
import { navbars } from "@/data/navbar";
import { classifyStack } from "@/lib/classify-stack";
import FloatingNavbarDemo from "@/components/navbars/FloatingNavbarDemo";

const floatingNavbar = navbars.find((n) => n.slug === "floating-navbar")!;

export const floatingNavbarDoc: ComponentDocEntry = {
  slug: "floating-navbar",
  name: "Floating Navbar",
  description: floatingNavbar.description ?? "",
  category: "navbars",
  stack: classifyStack(floatingNavbar.code),
  isNew: true,
  story:
    "Scroll down and it gets out of the way; scroll up an inch and it's back — a nav that trusts your intent instead of occupying the viewport. The show/hide is a transform-and-opacity move driven by scroll direction, not position, so it feels immediate at any depth of the page.",
  Preview: FloatingNavbarDemo,
  code: floatingNavbar.code,
  usage: `import FloatingNavbar from "@/components/ui/floating-navbar"

export function SiteHeader() {
  return (
    <FloatingNavbar
      links={[
        { label: "Home", href: "/" },
        { label: "Pricing", href: "/pricing" },
      ]}
      ctaLabel="Sign up"
      ctaHref="/signup"
    />
  )
}`,
  dependencies: ["framer-motion"],
  props: [
    { name: "links", type: "{ label: string; href: string }[]", description: "Navigation links. Defaults to a three-link demo set." },
    { name: "ctaLabel", type: "string", default: '"Get started"', description: "Label for the call-to-action pill." },
    { name: "ctaHref", type: "string", default: '"#"', description: "Destination for the call-to-action." },
    { name: "fixed", type: "boolean", default: "true", description: "Fix to the top of the viewport. Set false to render in-flow." },
    { name: "className", type: "string", default: '""', description: "Extra classes merged onto the nav." },
  ],
};
