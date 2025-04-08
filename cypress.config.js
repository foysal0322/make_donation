const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push(
            '--use-fake-ui-for-media-stream',  // Auto-allow camera/mic
            '--use-fake-device-for-media-stream',
            '--disable-popup-blocking',        // Disable permission popups
            '--unsafely-treat-insecure-origin-as-secure=https://example.com', // Trust website
            '--enable-features=WebContentsForceDark'
          );
        }
        return launchOptions;
      });
    }
  }
});
