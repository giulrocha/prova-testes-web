import homePage from '../support/pages/HomePage';
import authPage from '../support/pages/AuthPage';
import signupPage from '../support/pages/SignupPage';
import accountStatusPage from '../support/pages/AccountStatusPage';
import productsPage from '../support/pages/ProductsPage';
import cartPage from '../support/pages/CartPage';
import checkoutPage from '../support/pages/CheckoutPage';
import paymentPage from '../support/pages/PaymentPage';
import DataFactory from '../support/utils/dataFactory';
import ApiHelper from '../support/utils/apiHelper';

describe('Suíte 04: Realização de Pedidos e Checkout (Test Cases 15 e 16)', () => {
  beforeEach(() => {
    // 1. Launch browser & 2. Navigate to url
    homePage.visitHome();
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const user = DataFactory.generateUserData();
    const payment = DataFactory.generatePaymentData();

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Fill all details in Signup and create account
    authPage.fillSignupForm(user.name, user.email);
    authPage.submitSignup();
    signupPage.fillAccountDetails(user);
    signupPage.clickCreateAccount();

    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    accountStatusPage.verifyAccountCreated();
    accountStatusPage.clickContinue();

    // 7. Verify 'Logged in as username' at top
    homePage.validateLoggedInAs(user.name);

    // 8. Add products to cart
    homePage.clickProducts();
    productsPage.addProductToCartByIndex(0);
    productsPage.clickModalContinueShopping();

    // 9. Click 'Cart' button & 10. Verify that cart page is displayed
    homePage.clickCart();
    cartPage.verifyCartPageVisible();
    cartPage.verifyCartHasItems();

    // 11. Click Proceed To Checkout
    cartPage.clickProceedToCheckout();

    // 12. Verify Address Details and Review Your Order
    checkoutPage.verifyAddressDetailsAndOrderVisible();

    // 13. Enter description in comment text area and click 'Place Order'
    checkoutPage.enterComment('Pedido automatizado - TC 15');
    checkoutPage.clickPlaceOrder();

    // 14. Enter payment details & 15. Click 'Pay and Confirm Order' button
    paymentPage.fillPaymentDetails(payment);
    paymentPage.clickPayAndConfirmOrder();

    // 16. Verify success message 'Your order has been placed successfully!'
    paymentPage.verifyOrderPlacedSuccess();

    // 17. Click 'Delete Account' button
    homePage.clickDeleteAccount();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    accountStatusPage.verifyAccountDeleted();
    accountStatusPage.clickContinue();
  });

  it('Test Case 16: Place Order: Login before Checkout', () => {
    const user = DataFactory.generateUserData();
    const payment = DataFactory.generatePaymentData();

    // Criação prévia do usuário via API (Supertest) para garantir independência e consistência
    ApiHelper.createUser(user);

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click 'Signup / Login' button
    homePage.clickSignupLogin();

    // 5. Fill email, password and click 'Login' button
    authPage.fillLoginForm(user.email, user.password);
    authPage.submitLogin();

    // 6. Verify 'Logged in as username' at top
    homePage.validateLoggedInAs(user.name);

    // 7. Add products to cart
    homePage.clickProducts();
    productsPage.addProductToCartByIndex(0);
    productsPage.clickModalContinueShopping();

    // 8. Click 'Cart' button & 9. Verify that cart page is displayed
    homePage.clickCart();
    cartPage.verifyCartPageVisible();
    cartPage.verifyCartHasItems();

    // 10. Click Proceed To Checkout
    cartPage.clickProceedToCheckout();

    // 11. Verify Address Details and Review Your Order
    checkoutPage.verifyAddressDetailsAndOrderVisible();

    // 12. Enter description in comment text area and click 'Place Order'
    checkoutPage.enterComment('Pedido automatizado - TC 16');
    checkoutPage.clickPlaceOrder();

    // 13. Enter payment details & 14. Click 'Pay and Confirm Order' button
    paymentPage.fillPaymentDetails(payment);
    paymentPage.clickPayAndConfirmOrder();

    // 15. Verify success message 'Your order has been placed successfully!'
    paymentPage.verifyOrderPlacedSuccess();

    // 16. Click 'Delete Account' button
    homePage.clickDeleteAccount();

    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    accountStatusPage.verifyAccountDeleted();
    accountStatusPage.clickContinue();
  });
});
