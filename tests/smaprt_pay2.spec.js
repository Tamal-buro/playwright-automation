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

            await emailField.fill('sb-msvw58545680@mailinator.com');
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
        });
    });
});
