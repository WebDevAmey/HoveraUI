import { Accordion, AccordionItem } from "@/components/ui/plus-minus-accordion/plus-minus-accordion";

const groups = [
  {
    title: "Using it",
    items: [
      {
        q: "Is there a package to install?",
        a: "No. Each component is a .tsx file and a CSS module. Copy both, add the shared tokens once, and the code is yours to read and change.",
      },
      {
        q: "Which frameworks does it work with?",
        a: "Anything that renders React 19 and supports CSS modules: Next.js, Vite, Remix and similar. Components that need the browser are marked as client components.",
      },
      {
        q: "Do I need Tailwind?",
        a: "No. Components style themselves with CSS modules and custom properties. This site uses Tailwind for its own layout, and that is all.",
      },
    ],
  },
  {
    title: "Craft",
    items: [
      {
        q: "Why so few components?",
        a: "Every piece has to earn its place. The Essentials are the everyday controls done carefully; the rest each carry an idea you will not find elsewhere. Anything that turned out to be a familiar effect with a new name was cut or rethought.",
      },
      {
        q: "How do they behave with reduced motion?",
        a: "Ambient loops stop, canvases draw a single still frame and interactions resolve instantly. Nothing depends on animation to be used.",
      },
      {
        q: "Can I use them in client work?",
        a: "Yes. The library is MIT licensed. Change it, ship it and sell what you build with it.",
      },
    ],
  },
];

/** Grouped questions with hairline rows; heading levels follow the page they sit in. */
export function FaqGroups({ level = 3 }: { level?: 2 | 3 }) {
  const GroupHeading = level === 2 ? "h2" : "h3";
  return (
    <>
      {groups.map((group) => (
        <div key={group.title} className="mt-12 first:mt-0">
          <GroupHeading className="label mb-2">{group.title}</GroupHeading>
          <Accordion headingLevel={(level + 1) as 3 | 4}>
            {group.items.map((item) => (
              <AccordionItem key={item.q} value={item.q} title={item.q}>
                {item.a}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line">
      <div className="mx-auto max-w-[760px] px-4 py-28 sm:px-6">
        <h2 id="faq-title" className="display text-center text-[clamp(34px,4.4vw,52px)]">
          Questions, answered
        </h2>
        <p className="mt-4 text-center text-[16px] text-ink-2">The short version of what people ask before they copy a file.</p>
        <div className="mt-14">
          <FaqGroups />
        </div>
      </div>
    </section>
  );
}
