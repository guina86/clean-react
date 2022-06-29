import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:8080',
    supportFile: 'tests/cypress/support/commands.js',
    fixturesFolder: 'tests/cypress/fixtures',
    screenshotsFolder: 'tests/cypress/screenshots',
    videosFolder: 'tests/cypress/videos',
    downloadsFolder: 'tests/cypress/downloads',
    setupNodeEvents (on, config) {

    }
  }
})
