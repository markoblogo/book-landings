import { test, expect } from "@playwright/test";
import { allBooks } from "../../apps/agro-library/data/catalog";
import { assertNoConsoleErrors, collectSevereConsoleErrors, expectCanonicalPath, expectNoBrokenImages, openRoute } from "./shared";

test("publishing catalog exposes its current collections and book routes", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/");
  await expect(page.getByRole("heading", { name: "Books for physical commodity markets" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Product guides" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Professional guides" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Books in Ukrainian" })).toBeVisible();
  await expect(page.locator('[data-sitelen-layer-ui="toggle"]')).toHaveCount(0);
  await expectCanonicalPath(page, "/");
  await expectNoBrokenImages(page);

  for (const book of allBooks) {
    await openRoute(page, `/books/${book.slug}`);
    await expect(page.getByRole("heading", { name: book.title, exact: true })).toBeVisible();
    await expectCanonicalPath(page, `/books/${book.slug}`);
    const bookSchema = page.locator('script[type="application/ld+json"]');
    await expect(bookSchema).toHaveCount(1);
    expect(await bookSchema.textContent()).toContain('"@type":"Book"');
    await expectNoBrokenImages(page);
  }

  await assertNoConsoleErrors(consoleErrors);
});
