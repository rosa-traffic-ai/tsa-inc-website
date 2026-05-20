import { ContactRouteLayout } from "@/components/sections/route-families/custom-contact-layouts";
import {
  ServicesDetailLayout,
  ServicesHubLayout,
} from "@/components/sections/route-families/services-layouts";
import { toneVariants } from "@/lib/theme";
import type { ResolvedRouteLayout } from "@/lib/layout-orchestration";
import type { PageContent } from "@/lib/types";

interface RouteFamilyLayoutsProps {
  page: PageContent;
  layout: ResolvedRouteLayout;
}

export function RouteFamilyLayouts({ page, layout }: RouteFamilyLayoutsProps) {
  const tone = toneVariants[layout.tone];

  if (layout.family === "services_hub") {
    return <ServicesHubLayout layout={layout} page={page} tone={tone} />;
  }

  if (layout.family === "services_detail") {
    return <ServicesDetailLayout layout={layout} page={page} tone={tone} />;
  }

  if (layout.family === "contact") {
    return <ContactRouteLayout layout={layout} page={page} tone={tone} />;
  }

  return null;
}
