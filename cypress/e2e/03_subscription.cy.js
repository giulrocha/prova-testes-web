import homePage from '../support/pages/HomePage';
import DataFactory from '../support/utils/dataFactory';

describe('Suíte 03: Inscrição / Newsletter (Test Case 10)', () => {
  beforeEach(() => {
    // 1. Launch browser & 2. Navigate to url
    homePage.visitHome();
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    const subscriberEmail = DataFactory.generateUserData().email;

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Scroll down to footer
    homePage.scrollToFooter();

    // 5. Verify text 'SUBSCRIPTION'
    homePage.verifySubscriptionText();

    // 6. Enter email address in input and click arrow button
    homePage.subscribeEmail(subscriberEmail);

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    homePage.verifySubscriptionSuccess();
  });
});
