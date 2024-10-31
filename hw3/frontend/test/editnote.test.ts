// test/editNote.test.ts
import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';

test.describe('Edit Note', () => {
  test('should edit an existing note successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[name="login_form_username"]', 'tester');
    await page.fill('input[name="login_form_password"]', 'tester');
    await page.click('button[name="login_form_login"]');

    // Add a new note
    await page.click('button[name="add_new_note"]');
    await page.fill('input[name="text_title_new_note"]', 'Test Note');
    await page.fill('textarea[name="text_input_new_note"]', 'This is a test note.');
    await page.click('button[name="text_input_save_new_note"]');

    // Wait for the note to be added and locate it
    await expect(page.locator('h2', { hasText: 'Test Note' })).toBeVisible();
    const note = await page.locator('.note', { hasText: 'Test Note' });

    // Get the note's ID
    const noteId = await note.getAttribute('id');

    let a = randomInt(100000);


    // Edit the note
    await page.click(`button[name="edit-${noteId}"]`);
    await page.fill(`textarea[name="text_input-${noteId}"]`, `This is an edited test note${a}.`);
    await page.click(`button[name="text_input_save-${noteId}"]`);

    // Verify the note is edited

    await expect(page.locator('p', { hasText: `This is an edited test note${a}.` })).toBeVisible();
  });
});
