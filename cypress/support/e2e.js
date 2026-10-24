import 'cypress-mochawesome-reporter/register';
import './commands';

// Ignora erros não tratados disparados por scripts de terceiros da página em teste
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Bloqueia e cancela requisições de anúncios para garantir estabilidade e velocidade
beforeEach(() => {
  cy.intercept({ url: /google|doubleclick|adservice|amazon-adsystem/ }, { statusCode: 204 });
});
