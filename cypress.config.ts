import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/commands.js',
    setupNodeEvents (on, config) {

    }
  }
})
