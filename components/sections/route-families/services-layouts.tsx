import Link from "next/link";

import {
  OutputMatrix,
  ProcessStepsPanel,
  ToolingGrid,
} from "@/components/sections/service-detail-sections";
import {
  ServicesDetailVisual,
} from "@/components/sections/service-detail-visuals";
import { CtaStrip } from "@/components/sections/cta-strip";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { Heading } from "@/components/ui/heading";
import { interactiveSurfaceCard, surfacePanel } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import type { RouteFamilyLayoutsPropsWithTone } from "./types";
import { RouteHeader } from "./shared";

const SECTION_TITLE_CLASS = "text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]";
const SECTION_BODY_CLASS = "mt-4 max-w-4xl text-base leading-8 text-ink/75";
const EYEBROW_CLASS = "font-ui text-xs font-semibold uppercase tracking-[0.13em] text-clay";

export function ServicesHubLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  const groups = page.serviceGroups ?? [];

  if (!hero || groups.length === 0) {
    return null;
  }

  return (
    <>
      <RouteHeader
        align="center"
        eyebrowClassName="text-clay"
        heroAccentClassName="text-clay"
        hero={hero}
        layout={layout}
        tone={tone}
      />

      <section className="px-5 py-16 sm:px-8 lg:px-10" data-testid="services-hub-layout">
        <div className="mx-auto max-w-6xl space-y-10">
          {groups.map((group, groupIndex) => (
            <div key={group.id}>
              <Reveal delay={groupIndex * 0.03}>
                <Heading as="h2" className={cn("mt-2", SECTION_TITLE_CLASS)}>
                  {group.label}
                </Heading>
              </Reveal>
              <Reveal delay={groupIndex * 0.03 + 0.03}>
                <p className={SECTION_BODY_CLASS}>{group.description}</p>
              </Reveal>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item, itemIndex) => (
                  <Reveal key={item.href} delay={itemIndex * 0.04}>
                    <Link
                      className={cn(
                        interactiveSurfaceCard({ density: "compact", lift: "sm" }),
                        "block h-full border-line bg-paper shadow-[0_10px_24px_rgba(18,14,11,0.04)]",
                      )}
                      href={item.href}
                    >
                      <p className="font-heading text-xl font-semibold leading-tight text-ink">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-ink/72">{item.description}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {page.statement ? (
        <section className="bg-sand px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className={EYEBROW_CLASS}>{page.statement.tag}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <p className={SECTION_BODY_CLASS}>{page.statement.text}</p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks compactBottom links={page.relatedLinks} /> : null}
      <CtaStrip
        tag="Service Support"
        title="Need help selecting the right field method?"
        subtext="Share your objective and timeline. We will align you to the best-fit service route and data-collection approach."
      />
    </>
  );
}

export function ServicesDetailLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  const methodProfile = page.methodProfile;

  if (!hero || !methodProfile) {
    return null;
  }

  return (
    <>
      <RouteHeader
        eyebrowClassName="text-clay"
        heroAccentClassName="text-clay"
        hero={hero}
        layout={layout}
        tone={tone}
        sideContent={<ObjectivePanel objective={methodProfile.objective} tone={tone} />}
      />

      <section className="px-5 py-14 sm:px-8 lg:px-10" data-testid="services-detail-layout">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <ServicesDetailVisual route={page.route} tone={tone} />
          </Reveal>

          <div className="mt-6 grid gap-4">
            <Reveal>
              <ToolingGrid tone={tone} tools={methodProfile.tools} />
            </Reveal>
          </div>
        </div>
      </section>

      <ProcessStepsPanel steps={methodProfile.processSteps} tone={tone} />
      <OutputMatrix analysisOutputs={methodProfile.analysisOutputs} capturedData={methodProfile.capturedData} tone={tone} />

      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks compactBottom links={page.relatedLinks} /> : null}
      <CtaStrip
        tag="Service Planning"
        title="Ready to apply this service to your project?"
        subtext="Share your locations, time windows, and required outputs. We will confirm fit and schedule."
      />
    </>
  );
}

function ObjectivePanel({ objective, tone }: { objective: string; tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={EYEBROW_CLASS}>Service objective</p>
      <p className="mt-3 text-sm leading-7 text-ink/75">{objective}</p>
    </div>
  );
}
