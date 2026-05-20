import Image from "next/image";

import { surfacePanel } from "@/components/ui/patterns";
import type { ToneVariant } from "@/lib/theme";
import { cn } from "@/lib/utils";

const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const basePath = envBasePath
  ? envBasePath.startsWith("/")
    ? envBasePath.replace(/\/$/, "")
    : `/${envBasePath.replace(/\/$/, "")}`
  : "";

function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${basePath}${path}`;
}

interface VisualItem {
  src: string;
  alt: string;
  label: string;
  caption: string;
  loading?: "eager" | "lazy";
}

const servicesDetailFallback: VisualItem = {
  src: "/media/service-detail/pex-034-drone-cars-intersection.jpg",
  alt: "Service fallback traffic context",
  label: "Service context",
  caption: "Execution snapshots for setup, capture, and review.",
};

const servicesDetailVisualByRoute: Record<string, VisualItem> = {
  "/services/atr-counts": {
    src: "/media/service-detail/pex-015-cars-highway-blue-sky.jpg",
    alt: "ATR counts field context",
    label: "ATR counts",
    caption: "Automated counter setup, capture windows, and data review flow.",
  },
  "/services/turning-movement-counts": {
    src: "/media/service-detail/pex-12790305-turning-car.jpg",
    alt: "Car turning through an urban corner for turning-movement observation context",
    label: "Turning counts",
    caption: "Approach-level movement capture through peak windows.",
  },
  "/services/pedestrian-counts": {
    src: "/media/service-detail/pex-013-city-street-traffic.jpg",
    alt: "Pedestrian count corridor context",
    label: "Pedestrian counts",
    caption: "Pedestrian route and crossing volume collection logic.",
  },
  "/services/parking-utilization-survey": {
    src: "/media/service-detail/pixabay-6929203-parking-lot.jpg",
    alt: "Parking lot overhead view for parking utilization survey context",
    label: "Parking occupancy",
    caption: "Occupancy, duration, and turnover by interval and zone.",
  },
  "/services/license-plate-survey": {
    src: "/media/service-detail/pex-34235582-ontario-license-plate.jpg",
    alt: "Ontario license plate close-up for plate-capture survey context",
    label: "LPRS survey",
    caption: "Ontario plate capture context aligned to timestamp matching and route pattern analysis.",
  },
  "/services/vehicle-occupancy-surveys": {
    src: "/media/service-detail/pex-014-cars-on-highway-sign.jpg",
    alt: "Vehicle occupancy survey traffic context",
    label: "Vehicle occupancy",
    caption: "In-vehicle occupancy capture for demand efficiency reviews.",
  },
  "/services/ball-bank-study": {
    src: "/media/service-detail/pex-029-aerial-shot-road.jpg",
    alt: "Curve alignment context for ball bank study",
    label: "Ball bank",
    caption: "Curve banking evaluation and superelevation review.",
  },
  "/services/travel-time-studies": {
    src: "/media/service-detail/pex-020-cars-driving-highway.jpg",
    alt: "Travel time study route context",
    label: "Travel time",
    caption: "Route run timings and reliability comparisons by period.",
  },
  "/services/gps-travel-runs": {
    src: "/media/service-detail/pex-6044782-gps-dashboard.jpg",
    alt: "Car dashboard GPS navigation screen showing route tracking",
    label: "GPS runs",
    caption: "Directional GPS route traces and variability interpretation.",
  },
  "/services/delay-studies": {
    src: "/media/service-detail/pex-021-busy-highway-city.jpg",
    alt: "Delay study queueing context",
    label: "Delay study",
    caption: "Queue and stoppage behavior across selected windows.",
  },
  "/services/radar-speed-study": {
    src: "/media/service-detail/pixabay-502970-speed-radar-camera.jpg",
    alt: "Speed radar camera for radar speed study context",
    label: "Radar speed",
    caption: "Speed distribution capture and percentile reporting.",
  },
  "/services/gap-study": {
    src: "/media/service-detail/pex-027-cars-street-intersection.jpg",
    alt: "Gap study traffic interval context",
    label: "Gap study",
    caption: "Vehicle interval analysis for crossing feasibility decisions.",
  },
  "/services/cordon-counts": {
    src: "/media/service-detail/pex-028-vehicles-on-the-road.jpg",
    alt: "Cordon count boundary traffic context",
    label: "Cordon counts",
    caption: "Boundary crossing volumes aggregated by direction.",
  },
  "/services/customized-data-collection": {
    src: "/media/service-detail/pex-016-vehicles-highway-landscape.jpg",
    alt: "Customized data collection mixed-network context",
    label: "Custom program",
    caption: "Multi-method composition aligned to constraints and outputs.",
  },
};

function normalizeRoute(route: string) {
  return route.endsWith("/") ? route.slice(0, -1) : route;
}

function visualForServiceRoute(route: string): VisualItem {
  return servicesDetailVisualByRoute[normalizeRoute(route)] ?? servicesDetailFallback;
}

function VisualCard({
  item,
  tone,
  heightClass,
}: {
  item: VisualItem;
  tone: ToneVariant;
  heightClass: string;
}) {
  return (
    <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "h-full")}>
      <div className={cn("relative overflow-hidden rounded-xl border border-line/75 bg-sand/55", heightClass)}>
        <Image
          alt={item.alt}
          className="object-cover"
          fill
          loading={item.loading}
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={withBasePath(item.src)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full border border-paper/35 bg-ink/35 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-paper/88">
          {item.label}
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-ink/75">{item.caption}</p>
    </article>
  );
}

export function ServicesDetailVisual({ route, tone }: { route: string; tone: ToneVariant }) {
  return (
    <div data-testid="services-detail-visual">
      <VisualCard heightClass="h-52 sm:h-56" item={visualForServiceRoute(route)} tone={tone} />
    </div>
  );
}
