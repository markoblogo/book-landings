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

test("localized book cards link to complete articles below the book details", async ({ page }) => {
  const id = "chkouroupiy-jeanne-miss-adrienne";
  const articleBookIds = [
    id,
    "kosynka-gift",
    "ianovski-maitre-du-navire",
    "johansen-leonardo",
    "khvylovy-sanatorium",
    "pidmohylny-la-ville",
  ];
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/fr");
  const hero = page.locator("main > section").first();
  await expect(hero.getByRole("button", { name: /Jeanne la bataillonneuse/i })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Jeanne la bataillonneuse/i })).toBeVisible();
  await expect(page.locator(`a[href="/fr/book/${id}"]`).first()).toBeVisible();
  for (const bookId of articleBookIds) {
    await expect(page.locator(`a[href="/fr/book/${bookId}#seo-article"]`)).toHaveText("Lire la suite");
  }

  await openRoute(page, "/uk");
  for (const bookId of articleBookIds) {
    await expect(page.locator(`a[href="/uk/book/${bookId}#seo-article"]`)).toHaveText("Читати далі");
  }

  for (const locale of ["fr", "uk"] as const) {
    for (const bookId of articleBookIds) {
      await openRoute(page, `/${locale}/book/${bookId}`);
      await expectCanonicalPath(page, `/${locale}/book/${bookId}`);
      const article = page.locator("#seo-article");
      await expect(article).toBeVisible();
      await expect(article.locator("h2")).not.toBeEmpty();
      await expect(article.locator("p, ul").first()).toBeVisible();
      await expect(article).toHaveAttribute("lang", locale);
    }
  }

  await openRoute(page, `/fr/book/${id}`);
  await expectCanonicalPath(page, `/fr/book/${id}`);
  await expect(page.locator(`#seo-article a[href="/fr/article/${id}"]`)).toBeVisible();
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
