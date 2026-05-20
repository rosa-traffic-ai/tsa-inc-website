import type { ResolvedRouteLayout } from "@/lib/layout-orchestration";
import type { ToneVariant } from "@/lib/theme";
import type { PageContent } from "@/lib/types";

export interface RouteFamilyLayoutsPropsWithTone {
  page: PageContent;
  layout: ResolvedRouteLayout;
  tone: ToneVariant;
}
