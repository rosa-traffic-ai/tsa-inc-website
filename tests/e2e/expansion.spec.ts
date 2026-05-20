import { expect, test } from "@playwright/test";

const expansionRoutes = [
  "/services",
  "/services/atr-counts",
  "/services/turning-movement-counts",
  "/services/parking-utilization-survey",
  "/services/license-plate-survey",
  "/services/ball-bank-study",
  "/services/travel-time-studies",
  "/services/delay-studies",
  "/services/radar-speed-study",
  "/services/gap-study",
  "/services/cordon-counts",
  "/services/customized-data-collection",
] as const;

test("all expansion routes resolve", async ({ page }) => {
  for (const route of expansionRoutes) {
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator('[data-testid="pinned-media-stack"]')).toHaveCount(0);
  }
});

test("desktop nav shows Services with active state", async ({ page }) => {
  await page.goto("/services");
  const desktopNav = page.getByRole("navigation", { name: "Primary" });
  const servicesLink = desktopNav.getByRole("link", { name: "Services" });

  await expect(servicesLink).toBeVisible();
  await expect(servicesLink).toHaveClass(/after:scale-x-100/);
});

test("mobile nav includes Services", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto("/services");
  await page.getByLabel("Toggle menu").click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile Primary" });
  const servicesLink = mobileNav.getByRole("link", { name: "Services" });

  await expect(servicesLink).toBeVisible();
  await expect(servicesLink).toHaveClass(/bg-sand/);

  await context.close();
});
