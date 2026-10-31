import type { ComponentType } from "react";
import type { ComponentMeta } from "./types";

import morphButtonMeta from "@/components/ui/morph-button/meta";
import morphButtonDemo from "@/components/ui/morph-button/demo";
import glideTabsMeta from "@/components/ui/glide-tabs/meta";
import glideTabsDemo from "@/components/ui/glide-tabs/demo";
import softSwitchMeta from "@/components/ui/soft-switch/meta";
import softSwitchDemo from "@/components/ui/soft-switch/demo";
import quietTooltipMeta from "@/components/ui/quiet-tooltip/meta";
import quietTooltipDemo from "@/components/ui/quiet-tooltip/demo";
import depthKeyMeta from "@/components/ui/depth-key/meta";
import depthKeyDemo from "@/components/ui/depth-key/demo";
import ditherFillMeta from "@/components/ui/dither-fill/meta";
import ditherFillDemo from "@/components/ui/dither-fill/demo";
import pillowPressMeta from "@/components/ui/pillow-press/meta";
import pillowPressDemo from "@/components/ui/pillow-press/demo";
import splitLabelMeta from "@/components/ui/split-label/meta";
import splitLabelDemo from "@/components/ui/split-label/demo";
import holdToConfirmMeta from "@/components/ui/hold-to-confirm/meta";
import holdToConfirmDemo from "@/components/ui/hold-to-confirm/demo";
import detentToggleMeta from "@/components/ui/detent-toggle/meta";
import detentToggleDemo from "@/components/ui/detent-toggle/demo";
import glassSpecimenMeta from "@/components/ui/glass-specimen/meta";
import glassSpecimenDemo from "@/components/ui/glass-specimen/demo";
import ditherImageMeta from "@/components/ui/dither-image/meta";
import ditherImageDemo from "@/components/ui/dither-image/demo";
import fanDeckMeta from "@/components/ui/fan-deck/meta";
import fanDeckDemo from "@/components/ui/fan-deck/demo";
import gildedFrameMeta from "@/components/ui/gilded-frame/meta";
import gildedFrameDemo from "@/components/ui/gilded-frame/demo";
import cornerFoldMeta from "@/components/ui/corner-fold/meta";
import cornerFoldDemo from "@/components/ui/corner-fold/demo";
import perforatedTicketMeta from "@/components/ui/perforated-ticket/meta";
import perforatedTicketDemo from "@/components/ui/perforated-ticket/demo";
import slabFlipMeta from "@/components/ui/slab-flip/meta";
import slabFlipDemo from "@/components/ui/slab-flip/demo";
import skyCutoutMeta from "@/components/ui/sky-cutout/meta";
import skyCutoutDemo from "@/components/ui/sky-cutout/demo";
import ditherFieldMeta from "@/components/ui/dither-field/meta";
import ditherFieldDemo from "@/components/ui/dither-field/demo";
import halftoneTrailMeta from "@/components/ui/halftone-trail/meta";
import halftoneTrailDemo from "@/components/ui/halftone-trail/demo";
import grainMeta from "@/components/ui/grain/meta";
import grainDemo from "@/components/ui/grain/demo";
import asciiResolveMeta from "@/components/ui/ascii-resolve/meta";
import asciiResolveDemo from "@/components/ui/ascii-resolve/demo";
import pixelWipeMeta from "@/components/ui/pixel-wipe/meta";
import pixelWipeDemo from "@/components/ui/pixel-wipe/demo";
import auraMeta from "@/components/ui/aura/meta";
import auraDemo from "@/components/ui/aura/demo";
import slidingSegmentMeta from "@/components/ui/sliding-segment/meta";
import slidingSegmentDemo from "@/components/ui/sliding-segment/demo";
import steppedOtpMeta from "@/components/ui/stepped-otp/meta";
import steppedOtpDemo from "@/components/ui/stepped-otp/demo";
import detentSliderMeta from "@/components/ui/detent-slider/meta";
import detentSliderDemo from "@/components/ui/detent-slider/demo";
import commandPaletteMeta from "@/components/ui/command-palette/meta";
import commandPaletteDemo from "@/components/ui/command-palette/demo";
import orbitGalleryMeta from "@/components/ui/orbit-gallery/meta";
import orbitGalleryDemo from "@/components/ui/orbit-gallery/demo";
import hoverRevealMeta from "@/components/ui/hover-reveal/meta";
import hoverRevealDemo from "@/components/ui/hover-reveal/demo";
import plusMinusAccordionMeta from "@/components/ui/plus-minus-accordion/meta";
import plusMinusAccordionDemo from "@/components/ui/plus-minus-accordion/demo";
import timelineRailMeta from "@/components/ui/timeline-rail/meta";
import timelineRailDemo from "@/components/ui/timeline-rail/demo";
import morphTabsMeta from "@/components/ui/morph-tabs/meta";
import morphTabsDemo from "@/components/ui/morph-tabs/demo";
import stackToastMeta from "@/components/ui/stack-toast/meta";
import stackToastDemo from "@/components/ui/stack-toast/demo";
import ledMeterMeta from "@/components/ui/led-meter/meta";
import ledMeterDemo from "@/components/ui/led-meter/demo";
import anchorPopoverMeta from "@/components/ui/anchor-popover/meta";
import anchorPopoverDemo from "@/components/ui/anchor-popover/demo";

export type Entry = { meta: ComponentMeta; Demo: ComponentType };

export const registry: Entry[] = [
  { meta: morphButtonMeta, Demo: morphButtonDemo },
  { meta: glideTabsMeta, Demo: glideTabsDemo },
  { meta: softSwitchMeta, Demo: softSwitchDemo },
  { meta: quietTooltipMeta, Demo: quietTooltipDemo },
  { meta: depthKeyMeta, Demo: depthKeyDemo },
  { meta: ditherFillMeta, Demo: ditherFillDemo },
  { meta: pillowPressMeta, Demo: pillowPressDemo },
  { meta: splitLabelMeta, Demo: splitLabelDemo },
  { meta: holdToConfirmMeta, Demo: holdToConfirmDemo },
  { meta: detentToggleMeta, Demo: detentToggleDemo },
  { meta: glassSpecimenMeta, Demo: glassSpecimenDemo },
  { meta: ditherImageMeta, Demo: ditherImageDemo },
  { meta: fanDeckMeta, Demo: fanDeckDemo },
  { meta: gildedFrameMeta, Demo: gildedFrameDemo },
  { meta: cornerFoldMeta, Demo: cornerFoldDemo },
  { meta: perforatedTicketMeta, Demo: perforatedTicketDemo },
  { meta: slabFlipMeta, Demo: slabFlipDemo },
  { meta: skyCutoutMeta, Demo: skyCutoutDemo },
  { meta: ditherFieldMeta, Demo: ditherFieldDemo },
  { meta: halftoneTrailMeta, Demo: halftoneTrailDemo },
  { meta: grainMeta, Demo: grainDemo },
  { meta: asciiResolveMeta, Demo: asciiResolveDemo },
  { meta: pixelWipeMeta, Demo: pixelWipeDemo },
  { meta: auraMeta, Demo: auraDemo },
  { meta: slidingSegmentMeta, Demo: slidingSegmentDemo },
  { meta: steppedOtpMeta, Demo: steppedOtpDemo },
  { meta: detentSliderMeta, Demo: detentSliderDemo },
  { meta: commandPaletteMeta, Demo: commandPaletteDemo },
  { meta: orbitGalleryMeta, Demo: orbitGalleryDemo },
  { meta: hoverRevealMeta, Demo: hoverRevealDemo },
  { meta: plusMinusAccordionMeta, Demo: plusMinusAccordionDemo },
  { meta: timelineRailMeta, Demo: timelineRailDemo },
  { meta: morphTabsMeta, Demo: morphTabsDemo },
  { meta: stackToastMeta, Demo: stackToastDemo },
  { meta: ledMeterMeta, Demo: ledMeterDemo },
  { meta: anchorPopoverMeta, Demo: anchorPopoverDemo },
];

export function getEntry(slug: string): Entry | undefined {
  return registry.find((entry) => entry.meta.slug === slug);
}
