import type React from "react";
import type { BackgroundItem } from "@/types";
import Aurora from "@/components/backgrounds/Aurora";
import AuroraWarm from "@/components/backgrounds/AuroraWarm";
import Spotlight from "@/components/backgrounds/Spotlight";
import Spotlight2 from "@/components/backgrounds/Spotlight2";
import DotPattern from "@/components/backgrounds/DotPattern";
import Dotmatrix from "@/components/backgrounds/Dotmatrix";
import GridPattern from "@/components/backgrounds/GridPattern";
import SquarePattern from "@/components/backgrounds/SquarePattern";
import DiagonalLines from "@/components/backgrounds/DiagonalLines";
import MeshGradient from "@/components/backgrounds/MeshGradient";
import Spotlight3 from "@/components/backgrounds/Spotlight3";
import Spotlight4 from "@/components/backgrounds/Spotlight4";
import Spotlight5 from "@/components/backgrounds/Spotlight5";
import Spotlight6 from "@/components/backgrounds/Spotlight6";

export const backgrounds: BackgroundItem[] = [
  {
    name: "Aurora",
    slug: "aurora",
    category: "gradient",
    component: Aurora as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-black">
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at 20% 20%, rgba(124,58,237,.6), transparent 40%)",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at 80% 80%, rgba(6,182,212,.6), transparent 40%)",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at center, transparent, rgba(0,0,0,.8))",
    }}
  />
</div>`,
  },
  {
    name: "Aurora Warm",
    slug: "aurora-warm",
    category: "gradient",
    component: AuroraWarm as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-black">
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at 20% 20%, rgba(124,58,237,.6), transparent 40%)",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at 80% 80%, rgba(124, 50, 18, 0.6), transparent 40%)",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at center, transparent, rgba(0,0,0,.8))",
    }}
  />
</div>`,
  },
  {
    name: "Spotlight",
    slug: "spotlight",
    category: "gradient",
    component: Spotlight as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 50% 0%,
          rgba(168,85,247,.4),
          transparent 60%
        ),
        radial-gradient(
          80% 80% at 50% 100%,
          rgba(59,130,246,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  },
  {
    name: "Spotlight 2",
    slug: "spotlight-2",
    category: "gradient",
    component: Spotlight2 as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 0% 50%,
          rgba(168,85,247,.4),
          transparent 60%
        ),
        radial-gradient(
          80% 80% at 100% 50%,
          rgba(59,130,246,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  },
  {
    name: "Dot Grid",
    slug: "dot-grid",
    category: "pattern",
    component: DotPattern as React.ComponentType,
    code: `<div className="relative h-screen bg-black">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
        "radial-gradient(rgba(255,255,255,.3) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}
  />
</div>`,
  },
  {
    name: "Dot Matrix",
    slug: "dot-matrix",
    category: "pattern",
    component: Dotmatrix as React.ComponentType,
    code: `<div className="relative h-screen bg-black">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
        "radial-gradient(rgba(255,255,255,.25) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
</div>`,
  },
  {
    name: "Grid Pattern",
    slug: "grid-pattern",
    category: "pattern",
    component: GridPattern as React.ComponentType,
    code: `<div className="relative h-screen bg-black">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: \`
linear-gradient(rgba(168,85,247,.15) 1px, transparent 1px),
linear-gradient(90deg, rgba(59,130,246,.15) 1px, transparent 1px)
\`,
      backgroundSize: "40px 40px",
    }}
  />
</div>`,
  },
  {
    name: "Square Pattern",
    slug: "square-pattern",
    category: "pattern",
    component: SquarePattern as React.ComponentType,
    code: `<div className="relative h-screen bg-black">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='6' height='6' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E")\`,
      backgroundRepeat: "repeat",
    }}
  />
</div>`,
  },
  {
    name: "Diagonal Lines",
    slug: "diagonal-lines",
    category: "pattern",
    component: DiagonalLines as React.ComponentType,
    code: `<div className="relative h-screen bg-black">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: \`
        repeating-linear-gradient(
          45deg,
          rgba(255,255,255,.1) 0px,
          rgba(255,255,255,.1) 2px,
          transparent 2px,
          transparent 30px
        )
      \`,
    }}
  />
</div>`,
  },
  {
    name: "Mesh Gradient",
    slug: "mesh-gradient",
    category: "gradient",
    component: MeshGradient as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500 blur-[150px] opacity-40" />
  <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500 blur-[150px] opacity-40" />
</div>`,
  },
  {
    name: "Spotlight 3",
    slug: "spotlight-3",
    category: "gradient",
    component: Spotlight3 as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 0% 50%,
          rgba(168,85,247,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  } ,
  {
    name: "Spotlight 4",
    slug: "spotlight-4",
    category: "gradient",
    component: Spotlight4 as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 100% 50%,
          rgba(168,85,247,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  } ,
  {
    name: "Spotlight 5",
    slug: "spotlight-5",
    category: "gradient",
    component: Spotlight5 as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 0% 50%,
          rgba(168,85,247,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  } ,
  {
    name: "Spotlight 6",
    slug: "spotlight-6",
    category: "gradient",
    component: Spotlight6 as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 50% 100%,
          rgba(168,85,247,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  }
];
