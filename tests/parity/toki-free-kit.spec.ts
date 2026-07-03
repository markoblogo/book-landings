import { test, expect } from "@playwright/test";
import {
  assertNoConsoleErrors,
  collectSevereConsoleErrors,
  exerciseSitelenModes,
  expectCanonicalPath,
  expectLanguageSwitcher,
  expectLocalDownloadsReturnOk,
  expectNoBrokenImages,
  expectNoSitelenControls,
  expectSitelenControls,
  openRoute
} from "./shared";

test("English and toki pona home routes preserve PDF and sitelen behavior", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/en");
  await expect(page.getByRole("heading", { name: /Toki Pona Free Kit/i })).toBeVisible();
  await expectLanguageSwitcher(page, ["EN", "TP"]);
  await expectNoSitelenControls(page);
  await expectLocalDownloadsReturnOk(page);
  await expectCanonicalPath(page, "/en");
  await expectNoBrokenImages(page);

  await openRoute(page, "/tp");
  await expectLanguageSwitcher(page, ["EN", "TP"]);
  await expectSitelenControls(page);
  await exerciseSitelenModes(page);
  await expectLanguageSwitcher(page, ["EN", "TP"]);
  await expectLocalDownloadsReturnOk(page);
  await expectCanonicalPath(page, "/tp");

  await assertNoConsoleErrors(consoleErrors);
});

test("bare locale redirects remain stable", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);

  await page.goto("/kit");
  await expect(page).toHaveURL(/\/en\/kit$/);
  await expect(page.getByRole("heading", { name: /Reader.s Kits/i })).toBeVisible();
});

test("localized detail, legal, privacy, and kit routes render", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/en/books/readers-kit");
  await expect(page.getByRole("heading", { name: /Reader/i })).toBeVisible();
  await expectLocalDownloadsReturnOk(page);

  await openRoute(page, "/tp/books/readers-kit");
  await expectSitelenControls(page);
  await exerciseSitelenModes(page);
  await expectLanguageSwitcher(page, ["EN", "TP"]);

  await openRoute(page, "/en/legal");
  await expect(page.getByRole("heading", { name: /Legal/i })).toBeVisible();
  await openRoute(page, "/en/privacy");
  await expect(page.getByRole("heading", { name: /Privacy/i })).toBeVisible();
  await openRoute(page, "/en/kit");
  await expect(page.getByRole("heading", { name: /Reader.s Kits/i })).toBeVisible();

  await assertNoConsoleErrors(consoleErrors);
});
