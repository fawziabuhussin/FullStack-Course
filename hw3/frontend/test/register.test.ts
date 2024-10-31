// test/registerUser.test.ts
import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';

test.describe('User Registration', () => {
  test('should register User A successfully', async ({ page }) => {

    let randA = randomInt(123123123);
    await page.goto('http://localhost:3000');
    await page.fill('input[name="create_user_form_name"]', `User A${randA}`);
    await page.fill('input[name="create_user_form_email"]', `randomemailwhicisnotreal${randA}`);
    await page.fill('input[name="create_user_form_username"]', `real-user-no${randA}`);
    await page.fill('input[name="create_user_form_password"]', `passwordA${randA}`);
    await page.click('button[name="create_user_form_create_user"]');
    await expect(page.locator('text=Registration successful. You can now log in.')).toBeVisible();
  });

  test('should register User B successfully', async ({ page }) => {

    let randB = randomInt(123123123);
    await page.goto('http://localhost:3000');
    await page.fill('input[name="create_user_form_name"]', `User B${randB}`);
    await page.fill('input[name="create_user_form_email"]', `randomemailwhicisnotreal${randB}`);
    await page.fill('input[name="create_user_form_username"]', `real-user-no${randB}`);
    await page.fill('input[name="create_user_form_password"]', `passwordA${randB}`);
    await page.click('button[name="create_user_form_create_user"]');
    await expect(page.locator('text=Registration successful. You can now log in.')).toBeVisible();
  });

});
