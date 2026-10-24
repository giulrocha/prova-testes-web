import BasePage from './BasePage';

/**
 * CheckoutPage - Tela de revisão de endereço, itens do pedido e comentário
 */
class CheckoutPage extends BasePage {
  elements = {
    ...this.elements,
    addressDetailsHeading: () => cy.contains('h2', 'Address Details'),
    deliveryAddressBox: () => cy.get('#address_delivery'),
    invoiceAddressBox: () => cy.get('#address_invoice'),
    reviewOrderHeading: () => cy.contains('h2', 'Review Your Order'),
    commentTextArea: () => cy.get('textarea[name="message"]'),
    placeOrderButton: () => cy.get('a[href="/payment"].check_out'),
  };

  verifyAddressDetailsAndOrderVisible() {
    this.elements.addressDetailsHeading().should('be.visible');
    this.elements.deliveryAddressBox().should('be.visible');
    this.elements.invoiceAddressBox().should('be.visible');
    this.elements.reviewOrderHeading().should('be.visible');
    return this;
  }

  enterComment(comment = 'Test order placed by automated PGATS tests') {
    this.elements.commentTextArea().clear().type(comment);
    return this;
  }

  clickPlaceOrder() {
    this.elements.placeOrderButton().click();
    return this;
  }
}

export default new CheckoutPage();
