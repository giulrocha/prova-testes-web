import BasePage from './BasePage';

/**
 * ProductDetailPage - Detalhes do produto
 */
class ProductDetailPage extends BasePage {
  elements = {
    ...this.elements,
    productName: () => cy.get('.product-information h2'),
    category: () => cy.get('.product-information p').contains('Category:'),
    price: () => cy.get('.product-information span').contains('Rs.'),
    availability: () => cy.get('.product-information p').contains('Availability:'),
    condition: () => cy.get('.product-information p').contains('Condition:'),
    brand: () => cy.get('.product-information p').contains('Brand:'),
  };

  verifyProductDetailsVisible() {
    cy.url().should('include', '/product_details/');
    this.elements.productName().should('be.visible');
    this.elements.category().should('be.visible');
    this.elements.price().should('be.visible');
    this.elements.availability().should('be.visible');
    this.elements.condition().should('be.visible');
    this.elements.brand().should('be.visible');
    return this;
  }
}

export default new ProductDetailPage();
