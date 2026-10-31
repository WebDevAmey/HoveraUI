"use client";

import { Accordion, AccordionItem } from "./plus-minus-accordion";

export default function Demo() {
  return (
    <Accordion defaultValue="copy" style={{ maxWidth: 520 }}>
      <AccordionItem value="copy" title="How do I add a component?">
        Copy the component file and its stylesheet into your project, then import it like
        any of your own code. There is no package to install.
      </AccordionItem>
      <AccordionItem value="themes" title="Does it follow my theme?">
        Every colour reads from a small set of tokens. Set data-theme on any element and
        everything inside it switches.
      </AccordionItem>
      <AccordionItem value="motion" title="What happens with reduced motion?">
        Ambient loops stop and transitions become instant or simple fades. Nothing depends on
        animation to work.
      </AccordionItem>
      <AccordionItem value="license" title="Can I use it in client work?">
        Yes. Change it, ship it, sell what you build with it. Attribution is kind but not
        required.
      </AccordionItem>
    </Accordion>
  );
}
