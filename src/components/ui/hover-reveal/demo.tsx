"use client";

import { HoverReveal } from "./hover-reveal";

const cars = [
  { id: "sf90-xx", title: "Ferrari SF90 XX", meta: "Maranello · 1,030 cv", src: "/cars/ferrari-sf90-xx.webp" },
  { id: "gt3-rs", title: "Porsche 911 GT3 RS", meta: "Stuttgart · 525 ps", src: "/cars/porsche-911-gt3-rs.webp" },
  { id: "divo", title: "Bugatti Divo", meta: "Molsheim · 1,500 ps", src: "/cars/bugatti-divo.webp" },
];

export default function Demo() {
  return <HoverReveal items={cars} imageWidth={280} style={{ width: "min(100%, 560px)" }} />;
}
