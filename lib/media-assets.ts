export interface ScrollMediaClip {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
}

export interface RouteMediaStory {
  title: string;
  intro: string;
  clips: ScrollMediaClip[];
}

function resolveStaticBasePath() {
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
  if (envBasePath) {
    return envBasePath === "/" ? "" : envBasePath.replace(/\/$/, "");
  }

  const isGithubActions = process.env.GITHUB_ACTIONS === "true";
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isUserOrOrgPagesRepo = repo.endsWith(".github.io");

  if (!isGithubActions || !repo || isUserOrOrgPagesRepo) {
    return "";
  }

  return `/${repo}`;
}

const staticBasePath = resolveStaticBasePath();

function withBasePath(path: string) {
  if (!path.startsWith("/") || !staticBasePath) {
    return path;
  }

  if (path === staticBasePath || path.startsWith(`${staticBasePath}/`)) {
    return path;
  }

  return `${staticBasePath}${path}`;
}

function clip(
  id: string,
  title: string,
  description: string,
  videoSrc: string,
  posterSrc: string,
): ScrollMediaClip {
  return {
    id,
    title,
    description,
    videoSrc: withBasePath(videoSrc),
    posterSrc: withBasePath(posterSrc),
  };
}

const homeClips: ScrollMediaClip[] = [
  clip(
    "home-01",
    "Define the decision scope",
    "Before field collection starts, align what decision must be made, which locations and periods are in scope, and what confidence level the project requires.",
    "/media/videos/route-4067.mp4",
    "/media/posters/route-4067.jpg",
  ),
  clip(
    "home-02",
    "Read corridor conditions",
    "Field teams observe existing corridor behavior, turning pressure, pedestrian activity, and site constraints that affect collection design.",
    "/media/videos/route-56.mp4",
    "/media/posters/route-56.jpg",
  ),
  clip(
    "home-03",
    "Observe live operations",
    "Collection runs through planned windows so movement, volume, occupancy, speed, and travel behavior are captured under real operating demand.",
    "/media/videos/route-127.mp4",
    "/media/posters/route-127.jpg",
  ),
  clip(
    "home-04",
    "Validate variability",
    "Incoming records are reviewed for consistency, period representation, and location coverage so downstream interpretation remains reliable.",
    "/media/videos/route-611.mp4",
    "/media/posters/route-611.jpg",
  ),
  clip(
    "home-05",
    "Deliver actionable recommendations",
    "Outputs are structured so planning, design, and operations teams can directly use the evidence in reporting and next-step decisions.",
    "/media/videos/route-1755.mp4",
    "/media/posters/route-1755.jpg",
  ),
];

const routeMediaStories: Record<string, RouteMediaStory> = {
  "/": {
    title: "Traffic story, built from field evidence",
    intro: "A fast visual pass through scope definition, field capture, observed variability, and practical outputs.",
    clips: homeClips,
  },
};

export function getRouteMediaStory(route: string): RouteMediaStory | null {
  return routeMediaStories[route] ?? null;
}
