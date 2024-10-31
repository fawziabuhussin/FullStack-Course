// test/logoutUser.test.ts
import { test, expect } from '@playwright/test';

test.describe('User Logout', () => {
  test('should log out a user successfully', async ({ page }) => {
    // Log in the user
    await page.goto('http://localhost:3000');
    await page.fill('input[name="login_form_username"]', 'tester');
    await page.fill('input[name="login_form_password"]', 'tester');
    await page.click('button[name="login_form_login"]');

    // Ensure user is logged in
    await expect(page.locator('text=Welcome, test')).toBeVisible();

    // Log out the user
    await page.click('button[name="logout"]');

    // Verify the user is logged out
    await expect(page.locator('input[name="login_form_username"]')).toBeVisible();
    await expect(page.locator('input[name="login_form_password"]')).toBeVisible();
  });
});
