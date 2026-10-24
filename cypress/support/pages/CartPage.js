import BasePage from './BasePage';

/**
 * CartPage - Representa a tela de visualização do carrinho de compras
 */
class CartPage extends BasePage {
  elements = {
    ...this.elements,
    cartTable: () => cy.get('#cart_info_table'),
    cartItems: () => cy.get('#cart_info_table tbody tr'),
    proceedToCheckoutButton: () => cy.get('.check_out').contains('Proceed To Checkout'),
    registerLoginModalLink: () =>
      cy.get('.modal-content a[href="/login"]').contains('Register / Login'),
  };

  visitCart() {
    this.visit('/view_cart');
    return this;
  }

  verifyCartPageVisible() {
    cy.url().should('include', '/view_cart');
    this.elements.cartTable().should('be.visible');
    return this;
  }

  verifyCartHasItems() {
    this.elements.cartItems().should('have.length.greaterThan', 0);
    return this;
  }

  clickProceedToCheckout() {
    this.elements.proceedToCheckoutButton().click();
    return this;
  }

  clickRegisterLoginModal() {
    this.elements.registerLoginModalLink().click();
    return this;
  }
}

export default new CartPage();
