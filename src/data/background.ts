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
import HexGrid from "@/components/backgrounds/HexGrid";
import ConicSwirl from "@/components/backgrounds/ConicSwirl";
import Crosshatch from "@/components/backgrounds/Crosshatch";
import DuotoneDrift from "@/components/backgrounds/DuotoneDrift";
import PrismSpectrum from "@/components/backgrounds/PrismSpectrum";
import EmberDrift from "@/components/backgrounds/EmberDrift";
import NoiseVeil from "@/components/backgrounds/NoiseVeil";
import SonarArc from "@/components/backgrounds/SonarArc";

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
  },
  {
    name: "Hex Grid",
    slug: "hex-grid",
    category: "pattern",
    component: HexGrid as React.ComponentType,
    code: `<div className="relative h-screen bg-black">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpolygon points='28,0 56,16 56,50 28,66 0,50 0,16' fill='none' stroke='rgba(255,255,255,0.15)' stroke-width='1'/%3E%3C/svg%3E")\`,
      backgroundSize: "56px 100px",
    }}
  />
</div>`,
  },
  {
    name: "Conic Swirl",
    slug: "conic-swirl",
    category: "gradient",
    component: ConicSwirl as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-black">
  <div
    className="absolute inset-0"
    style={{
      background:
        "conic-gradient(from 180deg at 50% 50%, rgba(124,58,237,.5), rgba(6,182,212,.5), rgba(236,72,153,.5), rgba(124,58,237,.5))",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(circle at center, transparent, rgba(0,0,0,.85))",
    }}
  />
</div>`,
  },
  {
    name: "Crosshatch",
    slug: "crosshatch",
    category: "pattern",
    component: Crosshatch as React.ComponentType,
    code: `<div className="relative h-screen bg-black">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: \`
        repeating-linear-gradient(
          45deg,
          rgba(255,255,255,.08) 0px,
          rgba(255,255,255,.08) 1px,
          transparent 1px,
          transparent 16px
        ),
        repeating-linear-gradient(
          -45deg,
          rgba(255,255,255,.08) 0px,
          rgba(255,255,255,.08) 1px,
          transparent 1px,
          transparent 16px
        )
      \`,
    }}
  />
</div>`,
  },
  {
    name: "Duotone Drift",
    slug: "duotone-drift",
    category: "gradient",
    component: DuotoneDrift as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-black">
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(ellipse 60% 50% at 25% 40%, rgba(255,45,85,.9), transparent 60%)",
      mixBlendMode: "difference",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(ellipse 60% 50% at 75% 60%, rgba(45,212,191,.9), transparent 60%)",
      mixBlendMode: "difference",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(circle at center, transparent, rgba(0,0,0,.7))",
    }}
  />
</div>`,
  },
  {
    name: "Prism Spectrum",
    slug: "prism-spectrum",
    category: "gradient",
    component: PrismSpectrum as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-black">
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(115deg, transparent 30%, rgba(255,0,80,.55) 38%, rgba(255,200,0,.55) 44%, rgba(0,255,140,.55) 50%, rgba(0,180,255,.55) 56%, rgba(160,0,255,.55) 62%, transparent 70%)",
      filter: "blur(6px)",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background: "linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.85))",
    }}
  />
</div>`,
  },
  {
    name: "Ember Drift",
    slug: "ember-drift",
    category: "gradient",
    component: EmberDrift as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-[#0a0604]">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(circle at 12% 82%, rgba(255,130,40,.9) 0%, transparent 1.2%),
        radial-gradient(circle at 28% 64%, rgba(255,90,20,.85) 0%, transparent 0.8%),
        radial-gradient(circle at 41% 88%, rgba(255,170,60,.8) 0%, transparent 1%),
        radial-gradient(circle at 58% 70%, rgba(255,100,10,.85) 0%, transparent 0.9%),
        radial-gradient(circle at 73% 90%, rgba(255,150,50,.8) 0%, transparent 1.1%),
        radial-gradient(circle at 84% 58%, rgba(255,80,0,.9) 0%, transparent 0.7%),
        radial-gradient(circle at 19% 40%, rgba(255,140,40,.6) 0%, transparent 0.6%),
        radial-gradient(circle at 65% 35%, rgba(255,110,20,.55) 0%, transparent 0.5%),
        radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,70,0,.35), transparent 60%)
      \`,
      filter: "blur(1px)",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(circle at center, transparent, rgba(0,0,0,.85))",
    }}
  />
</div>`,
  },
  {
    name: "Noise Veil",
    slug: "noise-veil",
    category: "pattern",
    component: NoiseVeil as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-[#0c0f14]">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")\`,
      mixBlendMode: "screen",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at 30% 30%, rgba(45,212,191,.35), transparent 55%), radial-gradient(circle at 75% 75%, rgba(236,72,153,.3), transparent 55%)",
      mixBlendMode: "color",
    }}
  />
</div>`,
  },
  {
    name: "Sonar Arc",
    slug: "sonar-arc",
    category: "pattern",
    component: SonarArc as React.ComponentType,
    code: `<div className="relative h-screen overflow-hidden bg-black">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        repeating-radial-gradient(
          circle at 50% 130%,
          transparent 0px,
          transparent 36px,
          rgba(45,212,191,.22) 38px,
          transparent 40px
        )
      \`,
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      background: "linear-gradient(to top, rgba(0,0,0,.9), transparent 60%)",
    }}
  />
</div>`,
  }
];
