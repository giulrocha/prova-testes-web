import BasePage from './BasePage';

/**
 * AuthPage - Representa a tela de Login e Primeiro Passo de Cadastro
 */
class AuthPage extends BasePage {
  elements = {
    ...this.elements,
    // Formulário de Login
    loginHeading: () => cy.get('.login-form h2').contains('Login to your account'),
    loginEmailInput: () => cy.get('[data-qa="login-email"]'),
    loginPasswordInput: () => cy.get('[data-qa="login-password"]'),
    loginButton: () => cy.get('[data-qa="login-button"]'),
    loginErrorMessage: () => cy.get('.login-form form p'),

    // Formulário de Novo Usuário (Signup)
    signupHeading: () => cy.get('.signup-form h2').contains('New User Signup!'),
    signupNameInput: () => cy.get('[data-qa="signup-name"]'),
    signupEmailInput: () => cy.get('[data-qa="signup-email"]'),
    signupButton: () => cy.get('[data-qa="signup-button"]'),
    signupErrorMessage: () => cy.get('.signup-form form p'),
  };

  verifyLoginHeadingVisible() {
    this.elements.loginHeading().should('be.visible');
    return this;
  }

  verifyNewUserSignupVisible() {
    this.elements.signupHeading().should('be.visible');
    return this;
  }

  fillLoginForm(email, password) {
    this.elements.loginEmailInput().clear().type(email);
    this.elements.loginPasswordInput().clear().type(password);
    return this;
  }

  submitLogin() {
    this.elements.loginButton().click();
    return this;
  }

  fillSignupForm(name, email) {
    this.elements.signupNameInput().clear().type(name);
    this.elements.signupEmailInput().clear().type(email);
    return this;
  }

  submitSignup() {
    this.elements.signupButton().click();
    return this;
  }

  verifyLoginErrorMessage(message = 'Your email or password is incorrect!') {
    this.elements.loginErrorMessage().should('be.visible').and('contain.text', message);
    return this;
  }

  verifySignupErrorMessage(message = 'Email Address already exist!') {
    this.elements.signupErrorMessage().should('be.visible').and('contain.text', message);
    return this;
  }
}

export default new AuthPage();
