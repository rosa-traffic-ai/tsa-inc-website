import { expect, test } from "@playwright/test";

const nonHomeRoutes = [
  "/services",
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
  "/contact-us",
] as const;

test("homepage keeps media story; non-home pages do not mount pinned media stack", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="pinned-media-stack"]')).toHaveCount(0);

  for (const route of nonHomeRoutes) {
    await page.goto(route);
    await expect(page.locator('[data-testid="pinned-media-stack"]')).toHaveCount(0);
  }
});

test("services pages render expected family layouts", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator('[data-testid="services-hub-layout"]')).toBeVisible();

  await page.goto("/services/atr-counts");
  await expect(page.locator('[data-testid="services-detail-layout"]')).toBeVisible();

  await page.goto("/contact-us");
  await expect(page.getByRole("button", { name: "Submit Inquiry" })).toBeVisible();
});
