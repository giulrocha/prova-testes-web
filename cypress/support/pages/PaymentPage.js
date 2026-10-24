import BasePage from './BasePage';

/**
 * PaymentPage - Formulário de pagamento e confirmação de pedido
 */
class PaymentPage extends BasePage {
  elements = {
    ...this.elements,
    nameOnCardInput: () => cy.get('[data-qa="name-on-card"]'),
    cardNumberInput: () => cy.get('[data-qa="card-number"]'),
    cvcInput: () => cy.get('[data-qa="cvc"]'),
    expiryMonthInput: () => cy.get('[data-qa="expiry-month"]'),
    expiryYearInput: () => cy.get('[data-qa="expiry-year"]'),
    payAndConfirmButton: () => cy.get('[data-qa="pay-button"]'),
    successMessage: () => cy.get('[data-qa="order-placed"], .alert-success, p'),
  };

  fillPaymentDetails(paymentData) {
    this.elements.nameOnCardInput().clear().type(paymentData.nameOnCard);
    this.elements.cardNumberInput().clear().type(paymentData.cardNumber);
    this.elements.cvcInput().clear().type(paymentData.cvc);
    this.elements.expiryMonthInput().clear().type(paymentData.expiryMonth);
    this.elements.expiryYearInput().clear().type(paymentData.expiryYear);
    return this;
  }

  clickPayAndConfirmOrder() {
    this.elements.payAndConfirmButton().click();
    return this;
  }

  verifyOrderPlacedSuccess() {
    cy.contains(
      /Your order has been placed successfully!|Congratulations! Your order has been confirmed!/i
    ).should('be.visible');
    return this;
  }
}

export default new PaymentPage();
