// test/userActions.test.ts
import { test, expect } from '@playwright/test';
import { randomInt } from 'crypto';

test.describe('User Actions', () => {
  test('should add a note as one user and fail to edit it as another user', async ({ page }) => {
    // Register to user A.
    await page.goto('http://localhost:3000');

    
    await page.goto('http://localhost:3000');

    let randA = randomInt(123123123);
    await page.fill('input[name="create_user_form_name"]', `User A${randA}`);
    await page.fill('input[name="create_user_form_email"]', `randomemailwhicisnotreal${randA}`);
    await page.fill('input[name="create_user_form_username"]', `real-user-no${randA}`);
    await page.fill('input[name="create_user_form_password"]', `passwordA${randA}`);
    await page.click('button[name="create_user_form_create_user"]');
    await expect(page.locator('text=Registration successful. You can now log in.')).toBeVisible();


    // Login to user A.
    await page.fill('input[name="login_form_username"]', `real-user-no${randA}`);
    await page.fill('input[name="login_form_password"]', `passwordA${randA}`);
    await page.click('button[name="login_form_login"]');
    
    // Add a new note
    let a = randomInt(10000);
    await page.click('button[name="add_new_note"]');
    await page.fill('input[name="text_title_new_note"]', `Note by User A${a}.`);
    await page.fill('textarea[name="text_input_new_note"]', `This is a note was added by user A${a}.`);
    await page.click('button[name="text_input_save_new_note"]');
    
    // Wait for the note to be added and locate it
    await expect(page.locator('h2', { hasText: `Note by User A${a}.` })).toBeVisible();
    
    // Get the note's ID

    // Verify the note is added
    await expect(page.locator('h2', { hasText: `Note by User A${a}.` })).toBeVisible();
    await expect(page.locator('p', { hasText: `This is a note was added by user A${a}.` })).toBeVisible();

    // Log out User A
    await page.click('button[name="logout"]');

    // Log in as User B
    await page.fill('input[name="login_form_username"]', 'tester');
    await page.fill('input[name="login_form_password"]', 'tester');
    await page.click('button[name="login_form_login"]');

    // Try to edit the note
    const note = await page.locator('.note', { hasText: `Note by User A${a}.` });
    const noteId = await note.getAttribute('id');
    
    await expect(page.locator(`button[name="edit-${noteId}"]`)).not.toBeVisible();
  });



    test('should add a note as one user and fail to delete it as another user', async ({ page }) => {
      // Register to user A.
      await page.goto('http://localhost:3000');
  
      
      await page.goto('http://localhost:3000');
  
      let randA = randomInt(123123123);
      await page.fill('input[name="create_user_form_name"]', `User A${randA}`);
      await page.fill('input[name="create_user_form_email"]', `randomemailwhicisnotreal${randA}`);
      await page.fill('input[name="create_user_form_username"]', `real-user-no${randA}`);
      await page.fill('input[name="create_user_form_password"]', `passwordA${randA}`);
      await page.click('button[name="create_user_form_create_user"]');
      await expect(page.locator('text=Registration successful. You can now log in.')).toBeVisible();
  
  
      // Login to user A.
      await page.fill('input[name="login_form_username"]', `real-user-no${randA}`);
      await page.fill('input[name="login_form_password"]', `passwordA${randA}`);
      await page.click('button[name="login_form_login"]');
      
      // Add a new note
      let a = randomInt(10000);
      await page.click('button[name="add_new_note"]');
      await page.fill('input[name="text_title_new_note"]', `Note by User A${a}.`);
      await page.fill('textarea[name="text_input_new_note"]', `This is a note was added by user A${a}.`);
      await page.click('button[name="text_input_save_new_note"]');
      
      // Wait for the note to be added and locate it
      await expect(page.locator('h2', { hasText: `Note by User A${a}.` })).toBeVisible();
      
      // Get the note's ID
  
      // Verify the note is added
      await expect(page.locator('h2', { hasText: `Note by User A${a}.` })).toBeVisible();
      await expect(page.locator('p', { hasText: `This is a note was added by user A${a}.` })).toBeVisible();
  
      // Log out User A
      await page.click('button[name="logout"]');
  
      // Log in as User B
      await page.fill('input[name="login_form_username"]', 'tester');
      await page.fill('input[name="login_form_password"]', 'tester');
      await page.click('button[name="login_form_login"]');
  
      // Try to edit the note
      const note = await page.locator('.note', { hasText: `Note by User A${a}.` });
      const noteId = await note.getAttribute('id');
      
      await expect(page.locator(`button[name="delete-${noteId}"]`)).not.toBeVisible();
    });

    
});
