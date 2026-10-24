/**
 * BasePage - Classe base com métodos e seletores compartilhados por todas as páginas
 * Padrão Page Object Model conforme ensinado na apostila (página 47-48)
 */
class BasePage {
  elements = {
    headerLogo: () => cy.get('.logo img'),
    homeLink: () => cy.get('.shop-menu a[href="/"]').contains('Home'),
    productsLink: () => cy.get('.shop-menu a[href="/products"]').contains('Products'),
    cartLink: () => cy.get('.shop-menu a[href="/view_cart"]').contains('Cart'),
    signupLoginLink: () => cy.get('.shop-menu a[href="/login"]').contains('Signup / Login'),
    logoutLink: () => cy.get('.shop-menu a[href="/logout"]').contains('Logout'),
    deleteAccountLink: () =>
      cy.get('.shop-menu a[href="/delete_account"]').contains('Delete Account'),
    loggedInUserText: () => cy.get('.shop-menu').contains('li', 'Logged in as'),
  };

  visit(path = '/') {
    cy.visit(path);
    return this;
  }

  clickHome() {
    this.elements.homeLink().click();
    return this;
  }

  clickProducts() {
    this.elements.productsLink().click();
    return this;
  }

  clickCart() {
    this.elements.cartLink().click();
    return this;
  }

  clickSignupLogin() {
    this.elements.signupLoginLink().click();
    return this;
  }

  clickLogout() {
    this.elements.logoutLink().click();
    return this;
  }

  clickDeleteAccount() {
    this.elements.deleteAccountLink().click();
    return this;
  }

  validateLoggedInAs(username) {
    this.elements.loggedInUserText().should('be.visible').and('contain.text', username);
    return this;
  }
}

export default BasePage;
