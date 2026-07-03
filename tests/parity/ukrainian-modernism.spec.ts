import { test, expect } from "@playwright/test";
import {
  assertNoConsoleErrors,
  collectSevereConsoleErrors,
  expectCanonicalPath,
  expectLanguageSwitcher,
  expectLocalDownloadsReturnOk,
  expectNoBrokenImages,
  expectNoSitelenControls,
  openRoute
} from "./shared";

test("French and Ukrainian home routes keep editorial identity without sitelen controls", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/fr");
  await expect(page.getByRole("heading", { name: /Modernisme Ukrainien/i })).toBeVisible();
  await expect(page.locator('a[href*="youtube.com/watch"]').first()).toBeVisible();
  await expectLanguageSwitcher(page, ["FR", "UK"]);
  await expectNoSitelenControls(page);
  await expectCanonicalPath(page, "/fr");
  await expectNoBrokenImages(page);

  await openRoute(page, "/uk");
  await expect(page.getByRole("heading", { name: /Modernisme Ukrainien|Український Модернізм/i })).toBeVisible();
  await expectLanguageSwitcher(page, ["FR", "UK"]);
  await expectNoSitelenControls(page);
  await expectCanonicalPath(page, "/uk");
  await expectNoBrokenImages(page);

  await assertNoConsoleErrors(consoleErrors);
});

test("bare locale redirect remains stable", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.getByRole("heading", { name: /Modernisme Ukrainien/i })).toBeVisible();
});

test("localized legal, privacy, gift, and book routes render", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/fr/legal");
  await expect(page.getByRole("heading", { name: /Mentions légales/i })).toBeVisible();
  await openRoute(page, "/fr/privacy");
  await expect(page.getByRole("heading", { name: /Confidentialité|Privacy/i })).toBeVisible();

  await openRoute(page, "/fr/gift");
  await expect(page.getByRole("heading", { name: /livre en cadeau/i })).toBeVisible();
  await expectLocalDownloadsReturnOk(page);

  await openRoute(page, "/fr/book/kosynka-gift");
  await expect(page.getByRole("heading", { name: /Dans les seigles/i })).toBeVisible();
  await expectCanonicalPath(page, "/fr/book/kosynka-gift");
  await expectNoBrokenImages(page);
  await expectNoSitelenControls(page);

  await openRoute(page, "/uk/legal");
  await expect(page.locator("h1")).toBeVisible();
  await openRoute(page, "/uk/privacy");
  await expect(page.locator("h1")).toBeVisible();

  await assertNoConsoleErrors(consoleErrors);
});
