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

const daoBookIds = ["dao-de-jing", "sunzi", "mozi-universal-love"];

test("English and toki pona home routes preserve related links and sitelen scope", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/en");
  await expect(page.getByRole("heading", { name: /Chinese Wisdom in toki pona/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Toki Pona Translator/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Toki Stoic|Stoic Wisdom/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Kit/i }).first()).toBeVisible();
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

  await assertNoConsoleErrors(consoleErrors);
});

test("bare locale redirects remain stable", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);

  await page.goto("/kit");
  await expect(page).toHaveURL(/\/en\/kit$/);
  await expect(page.getByRole("heading", { name: /Reader.s Kits/i })).toBeVisible();
});

test("all migrated book detail routes render in both locales", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  for (const id of daoBookIds) {
    await openRoute(page, `/en/books/${id}`);
    await expect(page.locator("h1")).toBeVisible();
    await expectCanonicalPath(page, `/en/books/${id}`);
    await expectNoBrokenImages(page);

    await openRoute(page, `/tp/books/${id}`);
    await expect(page.locator("h1")).toBeVisible();
    await expectSitelenControls(page);
    await exerciseSitelenModes(page);
    await expectLanguageSwitcher(page, ["EN", "TP"]);
  }

  await openRoute(page, "/en/legal");
  await expect(page.getByRole("heading", { name: /Legal notice/i })).toBeVisible();
  await openRoute(page, "/en/privacy");
  await expect(page.getByRole("heading", { name: /Privacy policy/i })).toBeVisible();

  await assertNoConsoleErrors(consoleErrors);
});
