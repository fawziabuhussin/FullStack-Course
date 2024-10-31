// test/addNote.test.ts
import { test, expect } from '@playwright/test';

test.describe('Add Note', () => {
  test('should add a new note successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[name="login_form_username"]', 'tester');
    await page.fill('input[name="login_form_password"]', 'tester');
    await page.click('button[name="login_form_login"]');

    await page.click('button[name="add_new_note"]');
    await page.fill('textarea[name="text_input_new_note"]', 'This is a test note.');
    await page.click('button[name="text_input_save_new_note"]');

    await expect(page.locator('p', { hasText: 'This is a test note.' })).toBeVisible();
  });
});
