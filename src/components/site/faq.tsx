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
        q: "Why only thirty-one components?",
        a: "Every piece has to carry an idea you will not find in other libraries. When one turned out to be a familiar effect with a new name, it was cut or rethought.",
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
      <div className="mx-auto max-w-[760px] px-4 py-24 sm:px-6">
        <p className="label text-center">03 · Questions</p>
        <h2 id="faq-title" className="mt-3 text-center text-[clamp(26px,3.4vw,36px)] font-medium tracking-[-0.03em]">
          Asked, <span className="font-serif text-[1.12em] font-normal italic tracking-[-0.01em]">answered</span>
        </h2>
        <div className="mt-14">
          <FaqGroups />
        </div>
      </div>
    </section>
  );
}
