import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1, // Run tests sequentially
  use: {
    baseURL: 'http://localhost:3000', // Set your base URL
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  testDir: './test', // Set the directory where your tests are located
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
});
