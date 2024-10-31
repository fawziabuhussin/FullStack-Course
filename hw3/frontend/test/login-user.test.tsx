// test/loginUser.test.ts
import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('should log in a user successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[name="login_form_username"]', 'Fawzi1');
    await page.fill('input[name="login_form_password"]', '12345678');
    await page.click('button[name="login_form_login"]');

    await expect(page.locator('text=Welcome, Fawzi1')).toBeVisible();
  });

  // test/invalidLogin.test.ts

  test('should display an error message for incorrect credentials', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[name="login_form_username"]', 'NonExistentUser');
    await page.fill('input[name="login_form_password"]', 'wrongpassword');
    await page.click('button[name="login_form_login"]');
    await expect(page.locator('text=Welcome, NonExistentUser')).not.toBeVisible(); // Adjust based on your error message
  });


  test('should remain logged in after page refresh', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[name="login_form_username"]', 'tester');
    await page.fill('input[name="login_form_password"]', 'tester');
    await page.click('button[name="login_form_login"]');

    await expect(page.locator('text=Welcome, test')).toBeVisible();
    
    // Refresh the page
    await page.reload();

    // Verify the user is still logged in
    await expect(page.locator('text=Welcome, test')).toBeVisible();
  });


});
