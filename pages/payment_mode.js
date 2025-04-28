export default class PaymentMode {
    selectPaypal = async (page) => {
        await page
            .locator('section')
            .filter({ hasText: 'Unlimited Digital + Print Access' })
            .getByRole('button')
            .click();
    }

    payPal = async (page) => {
        await page.getByRole('button', { name: 'PAY WITH', exact: true }).click();
    }

    purchaseThroughPayPal = async (page, userEmail) => {
        const paypalPopupPromise = page.waitForEvent('popup');
        await page
            .frameLocator('iframe[name^="__zoid__paypal_buttons"]')
            .getByRole('link', { name: 'PayPal' })
            .click({delay: 2000});

        const paypalPage = await paypalPopupPromise;
        
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

        await paypalPage.getByRole('button', { name: 'Agree & Continue', exact: true }).click()
        await page.getByRole('button', { name: 'No thanks, continue', exact: true }).click();
        await page.getByRole('button', { name: 'Save and continue', exact: true }).click();
    }


}

const paymentMode = new PaymentMode();