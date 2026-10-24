import homePage from '../support/pages/HomePage';
import authPage from '../support/pages/AuthPage';
import signupPage from '../support/pages/SignupPage';
import accountStatusPage from '../support/pages/AccountStatusPage';
import DataFactory from '../support/utils/dataFactory';
import ApiHelper from '../support/utils/apiHelper';

describe('Suíte 01: Autenticação e Gestão de Usuários (Test Cases 1, 2, 3, 4 e 5)', () => {
  beforeEach(() => {
    // 1. Launch browser & 2. Navigate to url
    homePage.visitHome();
  });

  it('Test Case 1: Register User', () => {
    const user = DataFactory.generateUserData();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'New User Signup!' is visible
    authPage.verifyNewUserSignupVisible();

    // 6. Enter name and email address & 7. Click 'Signup' button
    authPage.fillSignupForm(user.name, user.email);
    authPage.submitSignup();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    signupPage.verifyAccountInfoHeadingVisible();

    // 9 a 12. Fill details: Title, Password, Date of birth, Checkboxes, Address details
    signupPage.fillAccountDetails(user);

    // 13. Click 'Create Account button'
    signupPage.clickCreateAccount();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    accountStatusPage.verifyAccountCreated();

    // 15. Click 'Continue' button
    accountStatusPage.clickContinue();

    // 16. Verify that 'Logged in as username' is visible
    homePage.validateLoggedInAs(user.name);

    // 17. Click 'Delete Account' button
    homePage.clickDeleteAccount();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    accountStatusPage.verifyAccountDeleted();
    accountStatusPage.clickContinue();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    const user = DataFactory.generateUserData();

    // Garante que o usuário existe previamente criando via API (Supertest)
    ApiHelper.createUser(user);

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'Login to your account' is visible
    authPage.verifyLoginHeadingVisible();

    // 6. Enter correct email address and password & 7. Click 'login' button
    authPage.fillLoginForm(user.email, user.password);
    authPage.submitLogin();

    // 8. Verify that 'Logged in as username' is visible
    homePage.validateLoggedInAs(user.name);

    // 9. Click 'Delete Account' button
    homePage.clickDeleteAccount();

    // 10. Verify that 'ACCOUNT DELETED!' is visible
    accountStatusPage.verifyAccountDeleted();
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    const invalidEmail = `invalid_${Date.now()}@notfound.com`;
    const invalidPassword = 'WrongPassword123!';

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'Login to your account' is visible
    authPage.verifyLoginHeadingVisible();

    // 6. Enter incorrect email address and password & 7. Click 'login' button
    authPage.fillLoginForm(invalidEmail, invalidPassword);
    authPage.submitLogin();

    // 8. Verify error 'Your email or password is incorrect!' is visible
    authPage.verifyLoginErrorMessage('Your email or password is incorrect!');
  });

  it('Test Case 4: Logout User', () => {
    const user = DataFactory.generateUserData();

    // Cria usuário via API (Supertest) para teste independente
    ApiHelper.createUser(user);

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'Login to your account' is visible
    authPage.verifyLoginHeadingVisible();

    // 6. Enter correct email address and password & 7. Click 'login' button
    authPage.fillLoginForm(user.email, user.password);
    authPage.submitLogin();

    // 8. Verify that 'Logged in as username' is visible
    homePage.validateLoggedInAs(user.name);

    // 9. Click 'Logout' button
    homePage.clickLogout();

    // 10. Verify that user is navigated to login page
    cy.url().should('include', '/login');
    authPage.verifyLoginHeadingVisible();

    // Limpeza da conta criada
    ApiHelper.deleteUser(user.email, user.password);
  });

  it('Test Case 5: Register User with existing email', () => {
    const user = DataFactory.generateUserData();

    // Cria o usuário previamente via API (Supertest)
    ApiHelper.createUser(user);

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Verify 'New User Signup!' is visible
    authPage.verifyNewUserSignupVisible();

    // 6. Enter name and already registered email address & 7. Click 'Signup' button
    authPage.fillSignupForm(user.name, user.email);
    authPage.submitSignup();

    // 8. Verify error 'Email Address already exist!' is visible
    authPage.verifySignupErrorMessage('Email Address already exist!');

    // Limpeza da conta criada
    ApiHelper.deleteUser(user.email, user.password);
  });
});
