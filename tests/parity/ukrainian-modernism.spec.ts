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

test("Chkouroupiy edition and paired editorial articles are linked, localized, and indexed", async ({ page }) => {
  const id = "chkouroupiy-jeanne-miss-adrienne";
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/fr");
  const hero = page.locator("main > section").first();
  await expect(hero.getByRole("button", { name: /Jeanne la bataillonneuse/i })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Jeanne la bataillonneuse/i })).toBeVisible();
  await expect(page.locator(`a[href="/fr/book/${id}"]`).first()).toBeVisible();

  await openRoute(page, `/fr/book/${id}`);
  await expectCanonicalPath(page, `/fr/book/${id}`);
  await expect(page.locator(`a[href="/fr/article/${id}"]`)).toBeVisible();
  const bookJsonLd = await page.locator('script[type="application/ld+json"]').last().textContent();
  expect(bookJsonLd).toContain('"BreadcrumbList"');
  await expectNoBrokenImages(page);

  await openRoute(page, `/fr/article/${id}`);
  await expectCanonicalPath(page, `/fr/article/${id}`);
  await expect(page.getByRole("heading", { name: /Géo Chkouroupiy en français/i, level: 1 })).toBeVisible();
  await expect(page.locator('link[rel="alternate"][hreflang="uk"]')).toHaveAttribute("href", new RegExp(`/uk/article/${id}$`));
  const frenchArticleLd = page.locator(`#jsonld-article-${id}`);
  const frenchArticleJsonLd = await frenchArticleLd.textContent();
  expect(frenchArticleJsonLd).toContain('"Article"');
  expect(frenchArticleJsonLd).toContain('"BreadcrumbList"');

  await openRoute(page, `/uk/article/${id}`);
  await expectCanonicalPath(page, `/uk/article/${id}`);
  await expect(page.getByRole("heading", { name: /Гео Шкурупій французькою/i, level: 1 })).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("lang", "uk");

  const sitemap = await page.request.get(new URL("/sitemap.xml", page.url()).toString());
  expect(await sitemap.text()).toContain(`/fr/article/${id}`);
  expect(await sitemap.text()).toContain(`/uk/article/${id}`);
  await assertNoConsoleErrors(consoleErrors);
});
