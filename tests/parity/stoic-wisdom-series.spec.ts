import { test, expect } from "@playwright/test";
import {
  assertNoConsoleErrors,
  collectSevereConsoleErrors,
  exerciseSitelenModes,
  expectCanonicalPath,
  expectLanguageSwitcher,
  expectNoBrokenImages,
  expectNoSitelenControls,
  expectSitelenControls,
  openRoute
} from "./shared";

test("English and toki pona home routes preserve runtime behavior", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/en");
  await expect(page.getByRole("heading", { name: /Stoic Wisdom in Toki Pona/i })).toBeVisible();
  await expectLanguageSwitcher(page, ["EN", "TP"]);
  await expectNoSitelenControls(page);
  await expectCanonicalPath(page, "/en");
  await expectNoBrokenImages(page);

  await openRoute(page, "/tp");
  await expectLanguageSwitcher(page, ["EN", "TP"]);
  await expectSitelenControls(page);
  await exerciseSitelenModes(page);
  await expectLanguageSwitcher(page, ["EN", "TP"]);
  await expectCanonicalPath(page, "/tp");
  await expectNoBrokenImages(page);

  await assertNoConsoleErrors(consoleErrors);
});

test("bare locale redirects remain stable", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);

  await page.goto("/kit");
  await expect(page).toHaveURL(/\/en\/kit$/);
  await expect(page.getByRole("heading", { name: /Reader.s Kits/i })).toBeVisible();
});

test("legal, privacy, and book detail routes render in browser", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/en/legal");
  await expect(page.getByRole("heading", { name: /Legal notice/i })).toBeVisible();
  await openRoute(page, "/en/privacy");
  await expect(page.getByRole("heading", { name: /Privacy policy/i })).toBeVisible();

  await openRoute(page, "/en/books/marcus-meditations");
  await expect(page.getByRole("heading", { name: /Meditations of Marcus Aurelius/i })).toBeVisible();
  await expectCanonicalPath(page, "/en/books/marcus-meditations");
  await expectNoBrokenImages(page);

  await openRoute(page, "/tp/books/marcus-meditations");
  await expectSitelenControls(page);
  await exerciseSitelenModes(page);
  await expectLanguageSwitcher(page, ["EN", "TP"]);

  await assertNoConsoleErrors(consoleErrors);
});
