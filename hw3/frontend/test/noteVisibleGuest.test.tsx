// test/noteVisibilityForGuests.test.ts
import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';

test.describe('Note Visibility for Guests', () => {
  test('should display notes to guest users but not allow editing or deleting', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // first login and add note then logout.
    // Login to user A.
    await page.fill('input[name="login_form_username"]', `tester`);
    await page.fill('input[name="login_form_password"]', `tester`);
    await page.click('button[name="login_form_login"]');
    
    // Add a new note
    let a = randomInt(10000);
    await page.click('button[name="add_new_note"]');
    await page.fill('input[name="text_title_new_note"]', `Note by tester ${a}.`);
    await page.fill('textarea[name="text_input_new_note"]', `This is a note was added by tester ${a}.`);
    await page.click('button[name="text_input_save_new_note"]');
    
    // Wait for the note to be added and locate it
    await expect(page.locator('h2', { hasText: `Note by tester ${a}.` })).toBeVisible();
    
    // Get the note's ID

    // Verify the note is added
    await expect(page.locator('h2', { hasText: `Note by tester ${a}.` })).toBeVisible();
    await expect(page.locator('p', { hasText: `This is a note was added by tester ${a}.` })).toBeVisible();

    // Log out User A
    await page.click('button[name="logout"]');


    // Verify note is visible
    await expect(page.locator('h2', { hasText: `Note by tester ${a}.` })).toBeVisible();

    // Verify edit and delete buttons are not visible
    const note = await page.locator('.note', { hasText: `Note by tester ${a}.` });
    const noteId = await note.getAttribute('id');
    await expect(page.locator(`button[name="edit-${noteId}"]`)).not.toBeVisible();
    await expect(page.locator(`button[name="delete-${noteId}"]`)).not.toBeVisible();
  });
});
