// Custom Commands Cypress - Conforme ensinado na apostila (página 53)

/**
 * Comando customizado para realizar login direto na interface
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-qa="login-email"]').clear().type(email);
  cy.get('[data-qa="login-password"]').clear().type(password);
  cy.get('[data-qa="login-button"]').click();
});

/**
 * Remove qualquer overlay/vignette que porventura apareça no DOM
 */
Cypress.Commands.add('dismissOverlays', () => {
  cy.get('body').then(($body) => {
    if ($body.find('ins.adsbygoogle, iframe[id^="aswift_"]').length > 0) {
      cy.get('ins.adsbygoogle, iframe[id^="aswift_"]').invoke('remove');
    }
  });
});
