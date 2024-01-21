import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // mobile emulation
  viewportWidth: 390,
  viewportHeight: 844,
});
