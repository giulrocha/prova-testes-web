const { defineConfig } = require('cypress');
const request = require('supertest');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Automation Exercise - Relatório de Testes E2E (PGATS)',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    blockHosts: [
      '*google*',
      '*googlesyndication.com',
      '*doubleclick.net',
      '*google-analytics.com',
      '*amazon-adsystem.com',
    ],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Tasks Node.js utilizando Supertest para interações diretas com a API
      on('task', {
        async createAccountViaApi(userData) {
          try {
            const res = await request('https://automationexercise.com')
              .post('/api/createAccount')
              .type('form')
              .send({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                title: userData.title,
                birth_date: userData.day,
                birth_month: userData.month,
                birth_year: userData.year,
                firstname: userData.firstName,
                lastname: userData.lastName,
                company: userData.company,
                address1: userData.address1,
                address2: userData.address2,
                country: userData.country,
                zipcode: userData.zipcode,
                state: userData.state,
                city: userData.city,
                mobile_number: userData.mobileNumber,
              });
            return res.body || { status: res.status };
          } catch (err) {
            return { error: err.message };
          }
        },

        async deleteAccountViaApi({ email, password }) {
          try {
            const res = await request('https://automationexercise.com')
              .delete('/api/deleteAccount')
              .type('form')
              .send({ email, password });
            return res.body || { status: res.status };
          } catch (err) {
            return { error: err.message };
          }
        },

        async getUserDetailViaApi(email) {
          try {
            const res = await request('https://automationexercise.com').get(
              `/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`
            );
            return res.body || { status: res.status };
          } catch (err) {
            return { error: err.message };
          }
        },
      });

      return config;
    },
  },
});
