import type { ComponentType } from "react";
import type { ComponentMeta } from "./types";

import morphButtonMeta from "@/components/ui/morph-button/meta";
import morphButtonDemo from "@/components/ui/morph-button/demo";
import glideTabsMeta from "@/components/ui/glide-tabs/meta";
import glideTabsDemo from "@/components/ui/glide-tabs/demo";
import softSwitchMeta from "@/components/ui/soft-switch/meta";
import softSwitchDemo from "@/components/ui/soft-switch/demo";
import copyFieldMeta from "@/components/ui/copy-field/meta";
import copyFieldDemo from "@/components/ui/copy-field/demo";
import plusMinusAccordionMeta from "@/components/ui/plus-minus-accordion/meta";
import plusMinusAccordionDemo from "@/components/ui/plus-minus-accordion/demo";
import lineAccordionMeta from "@/components/ui/line-accordion/meta";
import lineAccordionDemo from "@/components/ui/line-accordion/demo";
import shelfAccordionMeta from "@/components/ui/shelf-accordion/meta";
import shelfAccordionDemo from "@/components/ui/shelf-accordion/demo";
import layerAccordionMeta from "@/components/ui/layer-accordion/meta";
import layerAccordionDemo from "@/components/ui/layer-accordion/demo";
import cascadeAccordionMeta from "@/components/ui/cascade-accordion/meta";
import cascadeAccordionDemo from "@/components/ui/cascade-accordion/demo";
import depthKeyMeta from "@/components/ui/depth-key/meta";
import depthKeyDemo from "@/components/ui/depth-key/demo";
import pillowPressMeta from "@/components/ui/pillow-press/meta";
import pillowPressDemo from "@/components/ui/pillow-press/demo";
import holdToConfirmMeta from "@/components/ui/hold-to-confirm/meta";
import holdToConfirmDemo from "@/components/ui/hold-to-confirm/demo";
import ditherFillMeta from "@/components/ui/dither-fill/meta";
import ditherFillDemo from "@/components/ui/dither-fill/demo";
import fanDeckMeta from "@/components/ui/fan-deck/meta";
import fanDeckDemo from "@/components/ui/fan-deck/demo";
import ditherImageMeta from "@/components/ui/dither-image/meta";
import ditherImageDemo from "@/components/ui/dither-image/demo";
import perforatedTicketMeta from "@/components/ui/perforated-ticket/meta";
import perforatedTicketDemo from "@/components/ui/perforated-ticket/demo";
import steppedOtpMeta from "@/components/ui/stepped-otp/meta";
import steppedOtpDemo from "@/components/ui/stepped-otp/demo";
import detentSliderMeta from "@/components/ui/detent-slider/meta";
import detentSliderDemo from "@/components/ui/detent-slider/demo";
import commandPaletteMeta from "@/components/ui/command-palette/meta";
import commandPaletteDemo from "@/components/ui/command-palette/demo";
import pebbleTabsMeta from "@/components/ui/pebble-tabs/meta";
import pebbleTabsDemo from "@/components/ui/pebble-tabs/demo";
import hoverRevealMeta from "@/components/ui/hover-reveal/meta";
import hoverRevealDemo from "@/components/ui/hover-reveal/demo";
import branchSidebarMeta from "@/components/ui/branch-sidebar/meta";
import branchSidebarDemo from "@/components/ui/branch-sidebar/demo";
import rulerSidebarMeta from "@/components/ui/ruler-sidebar/meta";
import rulerSidebarDemo from "@/components/ui/ruler-sidebar/demo";
import anchorPopoverMeta from "@/components/ui/anchor-popover/meta";
import anchorPopoverDemo from "@/components/ui/anchor-popover/demo";
import ledMeterMeta from "@/components/ui/led-meter/meta";
import ledMeterDemo from "@/components/ui/led-meter/demo";

export type Entry = { meta: ComponentMeta; Demo: ComponentType };

/** In sidebar order: grouped by category, then by how often each piece is reached for. */
export const registry: Entry[] = [
  { meta: morphButtonMeta, Demo: morphButtonDemo },
  { meta: glideTabsMeta, Demo: glideTabsDemo },
  { meta: softSwitchMeta, Demo: softSwitchDemo },
  { meta: copyFieldMeta, Demo: copyFieldDemo },
  { meta: plusMinusAccordionMeta, Demo: plusMinusAccordionDemo },
  { meta: lineAccordionMeta, Demo: lineAccordionDemo },
  { meta: shelfAccordionMeta, Demo: shelfAccordionDemo },
  { meta: layerAccordionMeta, Demo: layerAccordionDemo },
  { meta: cascadeAccordionMeta, Demo: cascadeAccordionDemo },
  { meta: depthKeyMeta, Demo: depthKeyDemo },
  { meta: pillowPressMeta, Demo: pillowPressDemo },
  { meta: holdToConfirmMeta, Demo: holdToConfirmDemo },
  { meta: ditherFillMeta, Demo: ditherFillDemo },
  { meta: fanDeckMeta, Demo: fanDeckDemo },
  { meta: ditherImageMeta, Demo: ditherImageDemo },
  { meta: perforatedTicketMeta, Demo: perforatedTicketDemo },
  { meta: steppedOtpMeta, Demo: steppedOtpDemo },
  { meta: detentSliderMeta, Demo: detentSliderDemo },
  { meta: commandPaletteMeta, Demo: commandPaletteDemo },
  { meta: pebbleTabsMeta, Demo: pebbleTabsDemo },
  { meta: hoverRevealMeta, Demo: hoverRevealDemo },
  { meta: branchSidebarMeta, Demo: branchSidebarDemo },
  { meta: rulerSidebarMeta, Demo: rulerSidebarDemo },
  { meta: anchorPopoverMeta, Demo: anchorPopoverDemo },
  { meta: ledMeterMeta, Demo: ledMeterDemo },
];

export function getEntry(slug: string): Entry | undefined {
  return registry.find((entry) => entry.meta.slug === slug);
}
