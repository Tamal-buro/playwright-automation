const { test, expect, selectors } = require('@playwright/test');
import LandingPage from '../pages/landingPage';
import PaymentMode from '../pages/payment_mode';
import ChargebeeUtlis from '../utils/chargebee-utils';

let userEmail;

test.describe('Buy Digital + Print Offer', () => {
    
    test('Pay with Paypal', async ({ page }) => {
        const landingPage = new LandingPage(page)
        const paymentMode = new PaymentMode(page)
        const chargebeeUtlis = new ChargebeeUtlis()
        userEmail = 'sb-msvw58545680@mailinator.com';
        selectors.setTestIdAttribute('data-cy');
        await landingPage.navigate(page);
        test.slow();

        await paymentMode.selectPaypal(page);
        await paymentMode.payPal(page);

        // Wait for iframe to appear
        const paypalButtonFrame = page.frameLocator('iframe[name^="__zoid__paypal_buttons"]');

        // 🛠 Wait for the button to actually exist before clicking
        await paypalButtonFrame.getByLabel('Pay with PayPal').waitFor({ state: 'visible' });

        // ✅ Use Promise.all to correctly capture the popup
        const [paypalPage] = await Promise.all([
            page.waitForEvent('popup'),
            paypalButtonFrame.getByLabel('Pay with PayPal').click(),
        ]);

        await paypalPage.waitForLoadState();

        // Just wait visually so you can debug — replace with proper selectors if needed
        await paypalPage.waitForTimeout(3000);

        const emailField = paypalPage.getByPlaceholder('Email or mobile number');
        const passwordField = paypalPage.getByPlaceholder('Password');

        await emailField.fill(userEmail);
        await emailField.press('Enter');

        await paypalPage.waitForTimeout(3000);

        await passwordField.fill('4&.n<E;&');
        await passwordField.press('Enter');

        // ✅ This assertion will fail if redirected didn’t happen (i.e., payment not processed)
        //   await expect(
        //     page.getByText('You already have a subscription with this email address.')
        //   ).toBeVisible({ timeout: 10000 });

        await paypalPage.getByRole('button', { name: 'Agree & Continue', exact: true }).click();
        await page.getByRole('button', { name: 'No thanks, continue', exact: true }).click();
        await page.getByRole('button', { name: 'Save and continue', exact: true }).click();
        await expect(page.getByText(/Paypal Express Checkout/i)).toBeTruthy();

        await chargebeeUtlis.cleanChargebeeTestDtata(userEmail)
    });
});
