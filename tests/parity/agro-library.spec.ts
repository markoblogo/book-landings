import { test, expect } from "@playwright/test";
import { assertNoConsoleErrors, collectSevereConsoleErrors, openRoute } from "./shared";

test("placeholder app renders without migration-only features", async ({ page }) => {
  const consoleErrors = collectSevereConsoleErrors(page);

  await openRoute(page, "/");
  await expect(page.getByRole("heading", { name: /Agro Library/i })).toBeVisible();
  await expect(page.locator('[data-sitelen-layer-ui="toggle"]')).toHaveCount(0);

  await assertNoConsoleErrors(consoleErrors);
});
