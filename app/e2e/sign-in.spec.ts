import { test, expect } from "@playwright/test";

test("navigates to the sign-in page and signs in user", async ({ page }) => {
  await page.goto("https://eattheworld.se");
  await page.getByRole("link", { name: /sign in/ }).click();
  await expect(page.getByRole("heading", { level: 3 })).toContainText(
    "Sign in to your account"
  );
  await page
    .locator('input[type="email"]' && 'input[id="email"]')
    .type("admin@eattheworld.se"); // 4
  await page.locator('input[type="password"]').type("admin123"); // 4
  await page.getByRole("button", { name: "Sign In" }).click(); // 5
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Hi Admin, welcome back!"
  );
});
