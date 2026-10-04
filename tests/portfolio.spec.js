// @ts-check
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const SECTIONS = ["about", "skills", "experience", "projects", "security", "education", "contact"];

test.describe("Portfolio smoke tests", () => {
  /** @type {string[]} */
  let consoleErrors;

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", (err) => consoleErrors.push(err.message));
    await page.goto("/");
  });

  test("loads with the right title and hero", async ({ page }) => {
    await expect(page).toHaveTitle(/Moinul Islam/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Moinul Islam");
    await expect(page.locator("#hero-role")).toContainText("QA Automation");
  });

  test("renders every section from data.js", async ({ page }) => {
    for (const id of SECTIONS) {
      await expect(page.locator(`#${id} h2`).first(), `section #${id}`).toBeVisible();
    }
    await expect(page.locator("#timeline > li")).toHaveCount(3);
    await expect(page.locator("#skills-grid > article")).not.toHaveCount(0);
    await expect(page.locator("#project-cards > article")).not.toHaveCount(0);
  });

  test("every in-page link points to a real section", async ({ page }) => {
    const hrefs = await page.locator('a[href^="#"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      await expect(page.locator(/** @type {string} */ (href)), `target of ${href}`).toHaveCount(1);
    }
  });

  test("external links open safely in a new tab", async ({ page }) => {
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const rel = (await links.nth(i).getAttribute("rel")) || "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });

  test("CV download link serves a PDF", async ({ page, request }) => {
    const href = await page.locator("#cv-link").getAttribute("href");
    expect(href).toBeTruthy();
    const res = await request.get(/** @type {string} */ (href));
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
  });

  test("theme toggle switches and remembers the choice", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.locator("#theme-toggle").click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await expect(page.locator("#theme-toggle")).toHaveAttribute("aria-pressed", "true");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only behaviour");
    const menu = page.locator("#menu-toggle");
    const nav = page.locator("#site-nav");
    await expect(nav).toBeHidden();
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await nav.getByRole("link", { name: "Projects" }).click();
    await expect(nav).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("ships a Content-Security-Policy", async ({ page }) => {
    const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute("content");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain("unsafe-inline");
  });

  test("does not publish a phone number", async ({ page }) => {
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\+?880[\s-]?1\d{3}/);
  });

  test("layout has no horizontal scroll", async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("has no serious accessibility violations (dark + light)", async ({ page }) => {
    for (const theme of ["dark", "light"]) {
      if (theme === "light") await page.locator("#theme-toggle").click();
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${theme}: ${v.id} — ${v.help}`)).toEqual([]);
    }
  });

  test("logs no console errors", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    expect(consoleErrors).toEqual([]);
  });

  test("unknown pages show the custom 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    // GitHub Pages returns 404.html; the local test server is configured to do the same.
    expect(res && res.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  });
});

const BLOG_PAGES = [
  "/blog/",
  "/blog/qa-automation-security-testing-ci-pipeline/",
  "/blog/idor-testing-checklist-for-qa-engineers/",
  "/blog/qa-automation-security-testing-career-bangladesh/",
];

test.describe("SEO and blog", () => {
  for (const path of ["/", ...BLOG_PAGES]) {
    test(`${path} has a search-friendly title, description and canonical`, async ({ page }) => {
      await page.goto(path);
      // Bing flags titles of 70+ characters and descriptions outside 25-160.
      const title = await page.title();
      expect(title.length).toBeLessThan(70);
      const desc = (await page.locator('meta[name="description"]').getAttribute("content")) || "";
      expect(desc.length).toBeGreaterThanOrEqual(25);
      expect(desc.length).toBeLessThanOrEqual(160);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://moinulislam.pages.dev${path}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    });
  }

  test("blog index and homepage link to every article", async ({ page }) => {
    for (const listPage of ["/", "/blog/"]) {
      await page.goto(listPage);
      for (const path of BLOG_PAGES.slice(1)) {
        await expect(page.locator(`a[href="${path}"]`).first(), `${listPage} → ${path}`).toBeVisible();
      }
    }
  });

  test("internal links on blog pages resolve", async ({ page, request }) => {
    const seen = new Set();
    for (const path of BLOG_PAGES) {
      await page.goto(path);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")));
      for (const href of hrefs) {
        if (!href || seen.has(href)) continue;
        seen.add(href);
        const res = await request.get(href);
        expect(res.status(), `${path} → ${href}`).toBe(200);
      }
    }
  });

  test("blog pages have no serious accessibility violations or console errors", async ({ page }) => {
    test.setTimeout(90_000);
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
    for (const path of BLOG_PAGES) {
      await page.goto(path);
      for (const theme of ["dark", "light"]) {
        if (theme === "light") await page.locator("#theme-toggle").click();
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(serious.map((v) => `${path} ${theme}: ${v.id} — ${v.help}`)).toEqual([]);
      }
      await page.locator("#theme-toggle").click(); // back to dark for the next page
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} horizontal scroll`).toBeLessThanOrEqual(0);
    }
    expect(errors).toEqual([]);
  });
});
