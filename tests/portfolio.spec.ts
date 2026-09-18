import { test, expect } from "@playwright/test";
for (const width of [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
  test(`layout stays within viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Bijoy");
    await page.locator("img.portrait").evaluate(async (img) => {
      await (img as HTMLImageElement).decode();
    });
    await page.locator("#contact").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    if ([375, 768, 1440].includes(width)) {
      await page.evaluate(() =>
        document.querySelectorAll("section").forEach((x) => x.scrollIntoView()),
      );
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `artifacts/portfolio-${width}.png`,
        fullPage: true,
      });
    }
  });
}
test("filters, project dialogs, links and resume work", async ({ page }) => {
  await page.goto("/");
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await page
    .locator("#skills")
    .getByRole("button", { name: "Backend", exact: true })
    .click();
  await expect(page.locator(".skill-card")).toHaveCount(4);
  await page
    .locator("#skills")
    .getByRole("button", { name: "All", exact: true })
    .click();
  await expect(page.locator(".skill-card")).toHaveCount(12);
  await page
    .locator("#projects")
    .getByRole("button", { name: "Mobile", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Explore Dazzles", exact: true })
    .click();
  await expect(page.locator("dialog")).toBeVisible();
  await expect(
    page
      .locator("dialog")
      .getByRole("link", { name: "App Store", exact: true }),
  ).toHaveAttribute("href", /6746066647/);
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true }).first(),
  ).toHaveAttribute("href", "https://github.com/BijoyRaju");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download Resume" }).first().click();
  expect((await downloadPromise).suggestedFilename()).toBe("Bijoy-Raju-CV.pdf");
});
test("mobile navigation and keyboard escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/#contact/);
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
});
test("contact validates and shows real loading, success and error states", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();
  await page.getByLabel("Your name").fill("Alex Johnson");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page
    .getByLabel("What are you thinking?")
    .fill("Let us build a thoughtful application.");
  let resolveRequest: () => void = () => {};
  const hold = new Promise<void>((resolve) => {
    resolveRequest = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    await hold;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("button", { name: "Sending" })).toBeDisabled();
  resolveRequest();
  await expect(page.locator(".form-feedback")).toContainText(
    "Your message has been sent",
  );
  await expect(page.locator("#name")).toHaveValue("");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) => route.fulfill({ status: 500 }));
  await page.getByLabel("Your name").fill("Alex Johnson");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page
    .getByLabel("What are you thinking?")
    .fill("Another useful project message.");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.locator(".form-feedback")).toContainText(
    "could not be sent",
  );
  await expect(page.locator("#message")).toHaveValue(
    "Another useful project message.",
  );
});
test("theme, reduced motion, keyboard and 404", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main/);
  expect(
    await page
      .locator(".gradient-text")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.goto("/missing-page");
  await expect(
    page.getByRole("heading", { name: "A little off the beaten path." }),
  ).toBeVisible();
});
import AxeBuilder from "@axe-core/playwright";
test("automated accessibility checks on dark, light and project dialog", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const dark = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dark.violations).toEqual([]);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  const light = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(light.violations).toEqual([]);
  await page
    .getByRole("button", { name: "Explore Dazzles", exact: true })
    .click();
  const dialog = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialog.violations).toEqual([]);
});

test("CV experience and both PDF download buttons", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect(page.locator(".timeline-item")).toHaveCount(3);
  for (const text of [
    "Crisant Technologies",
    "Bridgeon Solutions",
    "Maathra Technologies",
    "Oct 2025 – Present",
    "Jan 2025 – Sep 2025",
    "Sep 2023 – Apr 2024",
  ]) {
    await expect(page.locator("#experience")).toContainText(text);
  }
  await expect(page.locator("#experience")).not.toContainText("State Street");
  const buttons = page.getByRole("link", { name: "Download Resume" });
  await expect(buttons).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    await expect(buttons.nth(i)).toHaveAttribute("href", "/Bijoy-Raju-CV.pdf");
    const pending = page.waitForEvent("download");
    await buttons.nth(i).click();
    const download = await pending;
    expect(download.suggestedFilename()).toBe("Bijoy-Raju-CV.pdf");
    expect(await download.failure()).toBeNull();
  }
  const pdf = await request.get("/Bijoy-Raju-CV.pdf");
  expect(pdf.ok()).toBeTruthy();
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
});
