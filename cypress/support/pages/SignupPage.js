import BasePage from './BasePage';

/**
 * SignupPage - Representa o formulário completo de 'ENTER ACCOUNT INFORMATION'
 */
class SignupPage extends BasePage {
  elements = {
    ...this.elements,
    accountInfoHeading: () => cy.contains('b', 'Enter Account Information'),
    mrTitleRadio: () => cy.get('#id_gender1'),
    mrsTitleRadio: () => cy.get('#id_gender2'),
    nameInput: () => cy.get('[data-qa="name"]'),
    emailInput: () => cy.get('[data-qa="email"]'),
    passwordInput: () => cy.get('[data-qa="password"]'),
    daysSelect: () => cy.get('[data-qa="days"]'),
    monthsSelect: () => cy.get('[data-qa="months"]'),
    yearsSelect: () => cy.get('[data-qa="years"]'),
    newsletterCheckbox: () => cy.get('#newsletter'),
    specialOffersCheckbox: () => cy.get('#optin'),

    // Dados de Endereço
    firstNameInput: () => cy.get('[data-qa="first_name"]'),
    lastNameInput: () => cy.get('[data-qa="last_name"]'),
    companyInput: () => cy.get('[data-qa="company"]'),
    address1Input: () => cy.get('[data-qa="address"]'),
    address2Input: () => cy.get('[data-qa="address2"]'),
    countrySelect: () => cy.get('[data-qa="country"]'),
    stateInput: () => cy.get('[data-qa="state"]'),
    cityInput: () => cy.get('[data-qa="city"]'),
    zipcodeInput: () => cy.get('[data-qa="zipcode"]'),
    mobileNumberInput: () => cy.get('[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('[data-qa="create-account"]'),
  };

  verifyAccountInfoHeadingVisible() {
    this.elements.accountInfoHeading().should('be.visible');
    return this;
  }

  fillAccountDetails(userData) {
    if (userData.title === 'Mrs') {
      this.elements.mrsTitleRadio().check();
    } else {
      this.elements.mrTitleRadio().check();
    }

    this.elements.passwordInput().clear().type(userData.password);

    if (userData.day) this.elements.daysSelect().select(userData.day);
    if (userData.month) this.elements.monthsSelect().select(userData.month);
    if (userData.year) this.elements.yearsSelect().select(userData.year);

    this.elements.newsletterCheckbox().check();
    this.elements.specialOffersCheckbox().check();

    this.elements.firstNameInput().clear().type(userData.firstName);
    this.elements.lastNameInput().clear().type(userData.lastName);
    this.elements.companyInput().clear().type(userData.company);
    this.elements.address1Input().clear().type(userData.address1);
    this.elements.address2Input().clear().type(userData.address2);
    this.elements.countrySelect().select(userData.country || 'United States');
    this.elements.stateInput().clear().type(userData.state);
    this.elements.cityInput().clear().type(userData.city);
    this.elements.zipcodeInput().clear().type(userData.zipcode);
    this.elements.mobileNumberInput().clear().type(userData.mobileNumber);

    return this;
  }

  clickCreateAccount() {
    this.elements.createAccountButton().click();
    return this;
  }
}

export default new SignupPage();
