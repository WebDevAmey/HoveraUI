import type { Metadata } from "next";
import DocsGalleryClient from "@/components/docs/DocsGalleryClient";

export const metadata: Metadata = {
  title: "Docs",
  description: "Browse Hovera UI component documentation, installation steps, usage and props.",
};

export default function DocsIndexPage() {
  return <DocsGalleryClient />;
}
