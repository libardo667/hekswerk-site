import {defineConfig, devices} from '@playwright/test';

const remoteBaseURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['line'], ['html', {outputFolder: 'playwright-report', open: 'never'}]],
  use: {
    baseURL: remoteBaseURL || 'http://127.0.0.1:4173',
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: remoteBaseURL
    ? undefined
    : {
        command: 'node scripts/serve-build.mjs',
        url: 'http://127.0.0.1:4173/',
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      },
  projects: [
    {
      name: 'desktop-chromium',
      use: {...devices['Desktop Chrome'], viewport: {width: 1440, height: 1000}},
    },
    {
      name: 'mobile-chromium',
      use: {...devices['Pixel 7'], viewport: {width: 390, height: 844}},
    },
  ],
});
