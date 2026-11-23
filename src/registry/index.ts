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
import hairlineAccordionMeta from "@/components/ui/hairline-accordion/meta";
import hairlineAccordionDemo from "@/components/ui/hairline-accordion/demo";
import tileAccordionMeta from "@/components/ui/tile-accordion/meta";
import tileAccordionDemo from "@/components/ui/tile-accordion/demo";
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
import glossButtonMeta from "@/components/ui/gloss-button/meta";
import glossButtonDemo from "@/components/ui/gloss-button/demo";
import fanDeckMeta from "@/components/ui/fan-deck/meta";
import fanDeckDemo from "@/components/ui/fan-deck/demo";
import perforatedTicketMeta from "@/components/ui/perforated-ticket/meta";
import perforatedTicketDemo from "@/components/ui/perforated-ticket/demo";
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

export type Entry = { meta: ComponentMeta; Demo: ComponentType };

/** In sidebar order: grouped by category, then by how often each piece is reached for. */
export const registry: Entry[] = [
  { meta: morphButtonMeta, Demo: morphButtonDemo },
  { meta: glideTabsMeta, Demo: glideTabsDemo },
  { meta: softSwitchMeta, Demo: softSwitchDemo },
  { meta: copyFieldMeta, Demo: copyFieldDemo },
  { meta: plusMinusAccordionMeta, Demo: plusMinusAccordionDemo },
  { meta: hairlineAccordionMeta, Demo: hairlineAccordionDemo },
  { meta: tileAccordionMeta, Demo: tileAccordionDemo },
  { meta: layerAccordionMeta, Demo: layerAccordionDemo },
  { meta: cascadeAccordionMeta, Demo: cascadeAccordionDemo },
  { meta: depthKeyMeta, Demo: depthKeyDemo },
  { meta: pillowPressMeta, Demo: pillowPressDemo },
  { meta: holdToConfirmMeta, Demo: holdToConfirmDemo },
  { meta: ditherFillMeta, Demo: ditherFillDemo },
  { meta: glossButtonMeta, Demo: glossButtonDemo },
  { meta: fanDeckMeta, Demo: fanDeckDemo },
  { meta: perforatedTicketMeta, Demo: perforatedTicketDemo },
  { meta: pebbleTabsMeta, Demo: pebbleTabsDemo },
  { meta: hoverRevealMeta, Demo: hoverRevealDemo },
  { meta: branchSidebarMeta, Demo: branchSidebarDemo },
  { meta: rulerSidebarMeta, Demo: rulerSidebarDemo },
  { meta: anchorPopoverMeta, Demo: anchorPopoverDemo },
];

export function getEntry(slug: string): Entry | undefined {
  return registry.find((entry) => entry.meta.slug === slug);
}
