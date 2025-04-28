// eslint-disable-next-line import/no-extraneous-dependencies
const { test, expect, selectors } = require('@playwright/test');

test.describe('Buy Subscription from The New Yorker', () => {
  test.describe('Buy Digital + Print Offer', () => {
    test('Pay with Paypal', async ({ page }) => {
      selectors.setTestIdAttribute('data-cy');

      await page.goto('https://stg.newyorker.com/v2/offers/tny-ppu-demo');
      test.slow();

      await page
        .locator('section')
        .filter({ hasText: 'Unlimited Digital + Print Access' })
        .getByRole('button')
        .click();

      await page.getByRole('button', { name: 'PAY WITH', exact: true }).click();
      // await page
      //   .getByRole('checkbox', { name: 'renewal-notice-consent' })
      //   .click();
      const paypalPopupPromise = page.waitForEvent('popup');
      //test.setTimeout(120000);
      await page
        .frameLocator('iframe[name^="__zoid__paypal_buttons"]')
        .getByLabel('Pay with PayPal')
        .click();
      const paypalPage = await paypalPopupPromise;
      await paypalPage.waitForLoadState();
      const emailField = await paypalPage.getByPlaceholder(
        'Email or mobile number'
      );
      const passwordField = await paypalPage.getByPlaceholder('Password');
      await page.waitForTimeout(15000);
      await emailField.fill('Condetest2024tax06@yopmail.com');
      await emailField.press('Enter');

      await page.waitForTimeout(15000);
      await paypalPage.getByPlaceholder('Password');
      await passwordField.fill('123@Conde');
      await passwordField.press('Enter');
      //await paypalPage.locator('[data-testid="submit-button-initial"]').click();
      await expect(
        page.getByText(
          'You already have a subscription with this email address.'
        )
      ).toBeTruthy();

      await paypalPage.getByRole('button', { name: 'Agree & Continue', exact: true }).click();
      await page.getByRole('button', { name: 'No thanks, continue', exact: true }).click(); //No thanks, continue
    });
  });
});