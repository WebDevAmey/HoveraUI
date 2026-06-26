import type { ComponentDocProp } from "@/types/docs";

interface PropsTableProps {
  props: ComponentDocProp[];
}

export default function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        This component does not take any props.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[var(--doc-radius)] border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/40">
            <th scope="col" className="px-4 py-2.5 font-medium text-foreground">Prop Name</th>
            <th scope="col" className="px-4 py-2.5 font-medium text-foreground">Type</th>
            <th scope="col" className="px-4 py-2.5 font-medium text-foreground">Default</th>
            <th scope="col" className="px-4 py-2.5 font-medium text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border last:border-b-0">
              <td className="px-4 py-2.5 font-mono text-xs text-hovera">{prop.name}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{prop.type}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{prop.default ?? "(required)"}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
