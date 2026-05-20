import type {
  LayoutFamily,
  LayoutTone,
  MediaMode,
  MotionPreset,
  PageContent,
  RouteMotionConfig,
} from "@/lib/types";

export interface ResolvedRouteLayout {
  route: string;
  family: LayoutFamily;
  tone: LayoutTone;
  motionPreset: MotionPreset;
  mediaMode: MediaMode;
  motionConfig: RouteMotionConfig;
}

const servicesDetailRoutes = [
  "/services/atr-counts",
  "/services/turning-movement-counts",
  "/services/pedestrian-counts",
  "/services/parking-utilization-survey",
  "/services/license-plate-survey",
  "/services/vehicle-occupancy-surveys",
  "/services/ball-bank-study",
  "/services/travel-time-studies",
  "/services/gps-travel-runs",
  "/services/delay-studies",
  "/services/radar-speed-study",
  "/services/gap-study",
  "/services/cordon-counts",
  "/services/customized-data-collection",
] as const;

const routeToneConfig: Partial<Record<LayoutFamily, LayoutTone>> = {
  services_hub: "slate",
  services_detail: "slate",
  contact: "clay",
};

const routeMediaModeConfig: Partial<Record<LayoutFamily, MediaMode>> = {
  services_hub: "abstract",
  services_detail: "abstract",
  contact: "abstract",
};

const familyMotionDefaults: Partial<Record<LayoutFamily, RouteMotionConfig>> = {
  services_hub: {
    interactionStyle: "chapter",
    ornamentPreset: "services_hub",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.82,
  },
  services_detail: {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.72,
  },
  contact: {
    interactionStyle: "restrained",
    ornamentPreset: "contact_timeline",
    assetPlacement: "right",
    panelHeight: "short",
    scrubStrength: 0.78,
  },
};

const servicesHubMotion: RouteMotionConfig = {
  interactionStyle: "chapter",
  ornamentPreset: "services_hub",
  assetPlacement: "right",
  panelHeight: "medium",
  scrubStrength: 0.82,
};

const servicesDetailMotion: RouteMotionConfig = {
  interactionStyle: "compact",
  ornamentPreset: "detail_counts",
  assetPlacement: "left",
  panelHeight: "medium",
  scrubStrength: 0.72,
};

const contactMotion: RouteMotionConfig = {
  interactionStyle: "restrained",
  ornamentPreset: "contact_timeline",
  assetPlacement: "right",
  panelHeight: "short",
  scrubStrength: 0.78,
};

export const routeMotionConfig: Record<string, RouteMotionConfig> = {
  "/services": servicesHubMotion,
  "/contact-us": contactMotion,
  ...Object.fromEntries(servicesDetailRoutes.map((route) => [route, servicesDetailMotion])),
};

function inferLayoutFamily(page: PageContent): LayoutFamily {
  if (page.layoutFamily) {
    return page.layoutFamily;
  }

  if (page.route === "/services") {
    return "services_hub";
  }

  if (page.route.startsWith("/services/")) {
    return "services_detail";
  }

  if (page.meta.template === "contact") {
    return "contact";
  }

  return "services_detail";
}

function resolveTone(family: LayoutFamily, page: PageContent): LayoutTone {
  if (page.layoutTone) {
    return page.layoutTone;
  }

  return routeToneConfig[family] ?? "slate";
}

function resolveMediaMode(family: LayoutFamily, page: PageContent): MediaMode {
  if (page.mediaMode) {
    return page.mediaMode;
  }

  return routeMediaModeConfig[family] ?? "abstract";
}

function resolveMotionConfig(family: LayoutFamily, route: string): RouteMotionConfig {
  return routeMotionConfig[route] ?? familyMotionDefaults[family] ?? servicesDetailMotion;
}

export function resolveRouteLayout(page: PageContent): ResolvedRouteLayout | null {
  if (page.route === "/") {
    return null;
  }

  const family = inferLayoutFamily(page);

  return {
    route: page.route,
    family,
    tone: resolveTone(family, page),
    motionPreset: page.motionPreset ?? "medium",
    mediaMode: resolveMediaMode(family, page),
    motionConfig: resolveMotionConfig(family, page.route),
  };
}
