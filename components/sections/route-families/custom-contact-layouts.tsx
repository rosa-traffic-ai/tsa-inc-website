import { ContactPanel } from "@/components/sections/contact-panel";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { surfacePanel } from "@/components/ui/patterns";
import { cn } from "@/lib/utils";

import type { RouteFamilyLayoutsPropsWithTone } from "./types";
import { RouteHeader } from "./shared";

export function ContactRouteLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  if (!hero || !page.contact) {
    return null;
  }

  return (
    <>
      <RouteHeader hero={hero} layout={layout} tone={tone} sideContent={<ResponseFlowPanel tone={tone} />} />
      <ContactPanel contact={page.contact} />
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom={false} /> : null}
    </>
  );
}

function ResponseFlowPanel({ tone }: { tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), "bg-paper/88", tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>Response flow</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-ink/75">
        <p>1. Share your scope and constraints</p>
        <p>2. We review methods and schedule fit</p>
        <p>3. You receive a practical quote and plan</p>
      </div>
    </div>
  );
}
