"use client";

import { useEffect, useRef, useState } from "react";

const FRAGMENT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main() {
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 uv = vec2(vUv.x * aspect, vUv.y);
    float t = uTime * 0.09;

    vec2 p1 = vec2((0.30 + 0.22 * sin(t * 1.3)) * aspect, 0.72 + 0.16 * cos(t * 1.1));
    vec2 p2 = vec2((0.72 + 0.24 * cos(t * 0.9)) * aspect, 0.30 + 0.20 * sin(t * 1.6));
    vec2 p3 = vec2((0.52 + 0.30 * sin(t * 0.6)) * aspect, 0.92 + 0.10 * cos(t * 1.9));

    float g1 = exp(-pow(distance(uv, p1), 2.0) * 5.5);
    float g2 = exp(-pow(distance(uv, p2), 2.0) * 6.5);
    float g3 = exp(-pow(distance(uv, p3), 2.0) * 4.0);

    vec3 col = uColorA * (g1 * 0.50 + g3 * 0.22) + uColorB * (g2 * 0.38);

    // fade toward the bottom so content below the fold stays clean
    col *= smoothstep(-0.15, 0.45, vUv.y);

    // ordered-ish dither to kill banding on the soft gradients
    float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 255.0 * 6.0;
    gl_FragColor = vec4(col + dither, 1.0);
  }
`;

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * The one WebGL accent: a slow duotone glow field behind the hero headline,
 * built on ogl (single fullscreen triangle, one fragment shader). The module
 * is imported dynamically inside the effect so it never touches the server
 * bundle or blocks headline paint; the CSS gradient poster underneath is the
 * permanent fallback for reduced motion, WebGL failure, and the first frames.
 * The render loop pauses when the hero is off-screen or the tab is hidden.
 */
export default function HeroGlowCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    import("ogl")
      .then(({ Renderer, Program, Mesh, Triangle }) => {
        if (destroyed || !container) return;

        const renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
          alpha: false,
          antialias: false,
          powerPreference: "low-power",
        });
        const gl = renderer.gl;
        gl.canvas.style.position = "absolute";
        gl.canvas.style.inset = "0";
        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          uniforms: {
            uTime: { value: 0 },
            uRes: { value: [1, 1] },
            uColorA: { value: [0.92, 0.92, 0.94] }, // near-white
            uColorB: { value: [0.55, 0.55, 0.58] }, // mid gray
          },
        });
        const mesh = new Mesh(gl, { geometry, program });

        let raf = 0;
        let running = false;
        const start = performance.now();

        function resize() {
          if (!container) return;
          renderer.setSize(container.clientWidth, container.clientHeight);
          program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
        }

        function frame() {
          if (!running) return;
          program.uniforms.uTime.value = (performance.now() - start) / 1000;
          renderer.render({ scene: mesh });
          raf = requestAnimationFrame(frame);
        }

        function setRunning(next: boolean) {
          if (next === running) return;
          running = next;
          if (running) raf = requestAnimationFrame(frame);
          else cancelAnimationFrame(raf);
        }

        const io = new IntersectionObserver(
          ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
          { threshold: 0 }
        );
        io.observe(container);

        function onVisibility() {
          setRunning(!document.hidden);
        }
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("resize", resize);

        resize();
        setRunning(true);
        requestAnimationFrame(() => setReady(true));

        cleanup = () => {
          setRunning(false);
          io.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("resize", resize);
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          gl.canvas.remove();
        };
      })
      .catch(() => {
        // WebGL unavailable — the CSS poster stays.
      });

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Static poster: always painted, the WebGL layer fades in over it. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 30% 70%, rgba(246,246,246,0.28), transparent 65%)," +
            "radial-gradient(ellipse 50% 40% at 72% 30%, rgba(238,238,238,0.20), transparent 65%)," +
            "#09090b",
        }}
      />
      <div
        ref={containerRef}
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
      {/* Grain veil to keep the glow filmic instead of plasticky */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
