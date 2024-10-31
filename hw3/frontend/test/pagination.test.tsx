// test/pagination.test.ts
import { test, expect } from '@playwright/test';

test.describe('Pagination', () => {
  test('should navigate through pages correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('button[name="next"]');

    await expect(page.locator('button[style*="font-weight: bold"]')).toHaveText('2');
  });


  test('should disable the "previous" button on the first page', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Verify the "next" button is disabled
    await expect(page.locator('button[name="previous"]')).toBeDisabled();
  });

    test('should disable the "next" button on the last page', async ({ page }) => {
      await page.goto('http://localhost:3000');
  
      // Navigate to the last page
      await page.click('button[name="last"]');
  
      // Verify the "next" button is disabled
      await expect(page.locator('button[name="next"]')).toBeDisabled();
    });

});
