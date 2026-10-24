import BasePage from './BasePage';

/**
 * ProductsPage - Página de catálogo de produtos e pesquisa
 */
class ProductsPage extends BasePage {
  elements = {
    ...this.elements,
    allProductsHeading: () => cy.get('.features_items').contains('h2', 'All Products'),
    productsList: () => cy.get('.features_items .col-sm-4'),
    firstProductViewLink: () => cy.get('a[href^="/product_details/"]').first(),
    searchInput: () => cy.get('#search_product'),
    searchButton: () => cy.get('#submit_search'),
    searchedProductsHeading: () => cy.get('.features_items').contains('h2', 'Searched Products'),
    modalContinueShoppingButton: () =>
      cy.get('.modal-content button').contains('Continue Shopping'),
    modalViewCartLink: () => cy.get('.modal-content a[href="/view_cart"]'),
  };

  visitProducts() {
    this.visit('/products');
    return this;
  }

  verifyAllProductsPageVisible() {
    cy.url().should('include', '/products');
    this.elements.allProductsHeading().should('be.visible');
    this.elements.productsList().should('have.length.greaterThan', 0);
    return this;
  }

  clickFirstProductView() {
    this.elements.firstProductViewLink().click();
    return this;
  }

  searchProduct(productName) {
    this.elements.searchInput().clear().type(productName);
    this.elements.searchButton().click();
    return this;
  }

  verifySearchedProductsVisible() {
    this.elements.searchedProductsHeading().should('be.visible');
    this.elements.productsList().should('have.length.greaterThan', 0);
    return this;
  }

  addProductToCartByIndex(index = 0) {
    this.elements.productsList().eq(index).find('a.add-to-cart').first().click({ force: true });
    return this;
  }

  clickModalContinueShopping() {
    this.elements.modalContinueShoppingButton().click();
    cy.get('#cartModal').should('not.be.visible');
    return this;
  }

  clickModalViewCart() {
    this.elements.modalViewCartLink().click();
    return this;
  }
}

export default new ProductsPage();
