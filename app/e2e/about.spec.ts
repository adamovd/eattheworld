import { test, expect } from "@playwright/test";

test("navigates to the about page", async ({ page }) => {
  await page.goto("https://eattheworld.se");
  await page.getByRole("link", { name: /about/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("About");
});
