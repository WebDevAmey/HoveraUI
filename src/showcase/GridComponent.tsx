import { backgrounds } from "@/data/background";
import ComponentCard from "./CardComponent";

export default function ComponentGrid() {
  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
      "
    >
      {backgrounds.map((item) => {
        const Preview = item.component;

        return (
          <ComponentCard
            key={item.name}
            title={item.name}
            slug={item.slug}
            code={item.code}
          >
            <Preview />
          </ComponentCard>
        );
      })}
    </div>
  );
}