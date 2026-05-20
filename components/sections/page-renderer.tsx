import { ApproachSection } from "@/components/sections/approach-section";
import { AudienceSection } from "@/components/sections/audience-section";
import { ContactPanel } from "@/components/sections/contact-panel";
import { CtaStrip } from "@/components/sections/cta-strip";
import { DetailAccordion } from "@/components/sections/detail-accordion";
import { HeroLines } from "@/components/sections/hero-lines";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { RouteFamilyLayouts } from "@/components/sections/route-family-layouts";
import { ServiceTabs } from "@/components/sections/service-tabs";
import { ScrollMediaStory } from "@/components/sections/scroll-media-story";
import { StatementBlock } from "@/components/sections/statement-block";
import { StatsRow } from "@/components/sections/stats-row";
import { resolveRouteLayout } from "@/lib/layout-orchestration";
import { getRouteMediaStory } from "@/lib/media-assets";
import type { PageContent } from "@/lib/types";

interface PageRendererProps {
  page: PageContent;
}

export function PageRenderer({ page }: PageRendererProps) {
  if (page.route !== "/") {
    const layout = resolveRouteLayout(page);

    if (!layout) {
      return null;
    }

    return <RouteFamilyLayouts layout={layout} page={page} />;
  }

  const servicesTitle = "Every service your project needs.";
  const mediaStory = getRouteMediaStory(page.route);

  return (
    <>
      {page.hero ? <HeroLines hero={page.hero} /> : null}
      {page.metrics?.length ? <StatsRow metrics={page.metrics} /> : null}
      {mediaStory ? <ScrollMediaStory clips={mediaStory.clips} intro={mediaStory.intro} title={mediaStory.title} /> : null}
      {page.statement ? <StatementBlock statement={page.statement} /> : null}

      {page.serviceGroups?.length
        ? page.meta.template === "home"
          ? <ServiceTabs groups={page.serviceGroups} title={servicesTitle} />
          : null
        : null}

      {page.approach ? <ApproachSection approach={page.approach} /> : null}
      {page.audiences ? <AudienceSection audiences={page.audiences} /> : null}
      {page.detail ? <DetailAccordion detail={page.detail} /> : null}
      {page.contact ? <ContactPanel contact={page.contact} /> : null}
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom={!page.contact} /> : null}

      {!page.contact ? (
        <CtaStrip
          tag="Get Started"
          title="Ready to collect the data that matters?"
          subtext="Tell us about your scope and timeline. We will respond with a practical collection plan and a no obligation quote."
        />
      ) : null}
    </>
  );
}
