import { getAllRoutes, loadAllPages } from "../lib/content";
import { resolveRouteLayout, routeMotionConfig } from "../lib/layout-orchestration";
import { getRouteMediaStory } from "../lib/media-assets";

const requiredRoutes = [
  "/",
  "/services",
  "/contact-us",
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
];

const serviceDetailRoutes = [
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

function isInternalLink(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function normalizeRoute(href: string) {
  return href.split("#")[0] || "/";
}

async function main() {
  const pages = await loadAllPages();
  const routes = await getAllRoutes();
  const routeSet = new Set(routes);

  const errors: string[] = [];

  for (const route of requiredRoutes) {
    if (!routeSet.has(route)) {
      errors.push(`Missing required route: ${route}`);
    }
  }

  for (const page of pages) {
    const layout = resolveRouteLayout(page);

    if (page.route !== "/") {
      if (!layout) {
        errors.push(`Missing layout resolution for non-home route: ${page.route}`);
      } else {
        if (!routeMotionConfig[page.route]) {
          errors.push(`Missing explicit routeMotionConfig entry: ${page.route}`);
        }

      }
    }

    if (page.serviceGroups) {
      for (const group of page.serviceGroups) {
        for (const item of group.items) {
          if (isInternalLink(item.href) && !routeSet.has(normalizeRoute(item.href))) {
            errors.push(`Orphan service link on ${page.route}: ${item.href}`);
          }
        }
      }
    }

    if (page.relatedLinks) {
      for (const link of page.relatedLinks) {
        if (isInternalLink(link.href) && !routeSet.has(normalizeRoute(link.href))) {
          errors.push(`Orphan related link on ${page.route}: ${link.href}`);
        }
      }
    }

    if (page.hero) {
      const heroLinks = [page.hero.primaryCta.href, page.hero.secondaryCta?.href].filter(
        (href): href is string => Boolean(href),
      );

      for (const href of heroLinks) {
        if (isInternalLink(href) && !routeSet.has(normalizeRoute(href))) {
          errors.push(`Orphan hero CTA link on ${page.route}: ${href}`);
        }
      }
    }

    if (serviceDetailRoutes.includes(page.route as (typeof serviceDetailRoutes)[number])) {
      if (!page.methodProfile) {
        errors.push(`Missing methodProfile block on service detail route: ${page.route}`);
      } else if (!routeSet.has(normalizeRoute(page.methodProfile.serviceHref))) {
        errors.push(`Invalid serviceHref on ${page.route}: ${page.methodProfile.serviceHref}`);
      }
    }
  }

  const homeStory = getRouteMediaStory("/");
  if (!homeStory || homeStory.clips.length === 0) {
    errors.push("Missing home media story clips on /.");
  }

  const turningMethod = pages.find((page) => page.route === "/services/turning-movement-counts");
  if (
    !turningMethod?.methodProfile?.durationRules.some(
      (rule) =>
        rule.includes("7:00-9:00") &&
        rule.includes("11:00-14:00") &&
        rule.includes("15:00-18:00"),
    )
  ) {
    errors.push("Missing turning-movement peak window claim on /services/turning-movement-counts.");
  }

  const lprsMethod = pages.find((page) => page.route === "/services/license-plate-survey");
  const lprsRules = [
    ...(lprsMethod?.methodProfile?.durationRules ?? []),
    ...(lprsMethod?.methodProfile?.standards ?? []),
  ];
  if (!lprsRules.some((rule) => rule.includes("95%"))) {
    errors.push("Missing LPRS 95%+ accuracy claim on /services/license-plate-survey.");
  }

  const radarMethod = pages.find((page) => page.route === "/services/radar-speed-study");
  if (
    !radarMethod?.methodProfile?.durationRules.some((rule) =>
      /2\s*hours?.*200\s*vehicles.*whichever\s*comes\s*first/i.test(rule),
    )
  ) {
    errors.push("Missing radar speed duration rule claim on /services/radar-speed-study.");
  }

  if (errors.length > 0) {
    console.error("Content integrity check failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Content integrity check passed for ${pages.length} pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
