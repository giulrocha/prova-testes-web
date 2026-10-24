import BasePage from './BasePage';

/**
 * AccountStatusPage - Validações de conta criada e excluída com sucesso
 */
class AccountStatusPage extends BasePage {
  elements = {
    ...this.elements,
    accountCreatedHeading: () => cy.get('[data-qa="account-created"]').should('be.visible'),
    accountDeletedHeading: () => cy.get('[data-qa="account-deleted"]').should('be.visible'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
  };

  verifyAccountCreated() {
    this.elements
      .accountCreatedHeading()
      .invoke('text')
      .should('match', /account created!/i);
    return this;
  }

  verifyAccountDeleted() {
    this.elements
      .accountDeletedHeading()
      .invoke('text')
      .should('match', /account deleted!/i);
    return this;
  }

  clickContinue() {
    this.elements.continueButton().click();
    return this;
  }
}

export default new AccountStatusPage();
