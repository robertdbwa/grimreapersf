const { defineConfig } = require("cypress");

module.exports = defineConfig({
  name: "An Electron application with Cypress e2e testing",
  version: "1.0.1",
  author: "Robert Kazuła <rkazula@craftware.biz>",

  retries: {
    runMode: 2,
    openMode: 0,
  },

  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 9000,
  requestTimeout: 14000,
  defaultCommandTimeout: 14000,
  includeShadowDom: true,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 1,

  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
