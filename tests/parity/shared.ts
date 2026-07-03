import { expect, type Locator, type Page } from "@playwright/test";

type ConsoleCollector = {
  assertClean: () => void;
};

const severeConsoleAllowlist = [
  // Next dev may log recoverable resource noise while compiling pages on first hit.
  /Failed to load resource: the server responded with a status of 404.*favicon/i
];

export function collectSevereConsoleErrors(page: Page): ConsoleCollector {
  const messages: string[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (severeConsoleAllowlist.some((pattern) => pattern.test(text))) return;
    messages.push(text);
  });

  page.on("pageerror", (error) => {
    messages.push(`pageerror: ${error.message}`);
  });

  return {
    assertClean() {
      expect(messages, "No severe browser console/page errors").toEqual([]);
    }
  };
}

export async function openRoute(page: Page, path: string): Promise<void> {
  const response = await page.goto(path);
  expect(response?.ok(), `${path} should return a successful response`).toBe(true);
  await expect(page.locator("main")).toBeVisible();
}

export async function expectCanonicalPath(page: Page, path: string): Promise<void> {
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical, `${path} should expose a canonical link`).toHaveCount(1);
  const href = await canonical.getAttribute("href");
  expect(href, `${path} canonical href`).toBeTruthy();
  expect(new URL(href as string).pathname).toBe(path);
}

export async function expectNoBrokenImages(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect
    .poll(
      async () =>
        page.locator("img").evaluateAll((images) =>
          images
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.getAttribute("src") ?? image.getAttribute("alt") ?? "unknown image")
        ),
      {
        message: "All rendered images should load",
        timeout: 10_000
      }
    )
    .toEqual([]);
}

export async function expectLanguageSwitcher(page: Page, labels: string[]): Promise<Locator> {
  const switcher = page.locator("[data-locale-switcher]");
  await expect(switcher).toBeVisible();
  for (const label of labels) {
    await expect(switcher).toContainText(label);
  }
  return switcher;
}

export async function expectNoSitelenControls(page: Page): Promise<void> {
  await expect(page.locator('[data-sitelen-layer-ui="toggle"]')).toHaveCount(0);
}

export async function expectSitelenControls(page: Page): Promise<void> {
  const toggle = page.locator('[data-sitelen-layer-ui="toggle"]');
  await expect(toggle).toBeVisible({ timeout: 15_000 });
  await expect(toggle.locator('button[data-layer="latin"]')).toHaveText(/TP/);
  await expect(toggle.locator('button[data-layer="sitelen-pona"]')).toHaveText(/SP/);
  await expect(toggle.locator('button[data-layer="sitelen-emoji"]')).toHaveText(/🙂|emoji/i);
}

export async function exerciseSitelenModes(page: Page): Promise<void> {
  const toggle = page.locator('[data-sitelen-layer-ui="toggle"]');
  const sitelenPona = toggle.locator('button[data-layer="sitelen-pona"]');
  const emoji = toggle.locator('button[data-layer="sitelen-emoji"]');
  const latin = toggle.locator('button[data-layer="latin"]');

  await sitelenPona.click();
  await expect(sitelenPona).toHaveAttribute("aria-pressed", "true");
  await emoji.click();
  await expect(emoji).toHaveAttribute("aria-pressed", "true");
  await latin.click();
  await expect(latin).toHaveAttribute("aria-pressed", "true");
}

export async function expectLocalDownloadsReturnOk(page: Page): Promise<void> {
  const hrefs = await page.locator('a[href$=".pdf"], a[href*=".pdf?"], a[href$=".epub"], a[href*=".epub?"]').evaluateAll((links) =>
    Array.from(new Set(links.map((link) => (link as HTMLAnchorElement).href)))
  );
  const local = hrefs.filter((href) => new URL(href).origin === new URL(page.url()).origin);
  expect(local.length, "At least one local PDF/EPUB link should be present").toBeGreaterThan(0);

  for (const href of local) {
    const url = new URL(href);
    const response = await page.request.get(`${url.pathname}${url.search}`);
    expect(response.ok(), `${url.pathname} should return HTTP 200`).toBe(true);
  }
}

export async function assertNoConsoleErrors(collector: ConsoleCollector): Promise<void> {
  collector.assertClean();
}
