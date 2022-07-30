module.exports = {
  testDir: 'tests/e2e',
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    // slowMo: 100,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    timeout: 30000
  }
}
