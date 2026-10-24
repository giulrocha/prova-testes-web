import BasePage from './BasePage';

/**
 * HomePage - Representa a página inicial da aplicação
 */
class HomePage extends BasePage {
  elements = {
    ...this.elements,
    sliderCarousel: () => cy.get('#slider-carousel'),
    featuredItemsTitle: () => cy.get('.features_items').contains('Features Items'),
    footer: () => cy.get('#footer'),
    subscriptionHeading: () => cy.get('#footer').contains('h2', 'Subscription'),
    subscriptionEmailInput: () => cy.get('#susbscribe_email'),
    subscribeButton: () => cy.get('#subscribe'),
    subscribeSuccessAlert: () => cy.get('#success-subscribe .alert-success'),
  };

  visitHome() {
    this.visit('/');
    return this;
  }

  verifyHomePageVisible() {
    cy.url().should('include', 'automationexercise.com');
    this.elements.sliderCarousel().should('be.visible');
    this.elements.featuredItemsTitle().should('be.visible');
    return this;
  }

  scrollToFooter() {
    this.elements.footer().scrollIntoView();
    return this;
  }

  verifySubscriptionText() {
    this.elements.subscriptionHeading().should('be.visible').and('contain.text', 'Subscription');
    return this;
  }

  subscribeEmail(email) {
    this.elements.subscriptionEmailInput().clear().type(email);
    this.elements.subscribeButton().click();
    return this;
  }

  verifySubscriptionSuccess() {
    this.elements
      .subscribeSuccessAlert()
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
    return this;
  }
}

export default new HomePage();
