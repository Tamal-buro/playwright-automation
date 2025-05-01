export default class PaymentMode {
    constructor(page) {
        this.page = page;
    }
    selectPaypal = async () => {
        await this.page
            .locator('section')
            .filter({ hasText: 'Unlimited Digital + Print Access' })
            .getByRole('button')
            .click();
    }

    payPal = async () => {
        await this.page.getByRole('button', { name: 'PAY WITH', exact: true }).click();
    }

    purchaseThroughPayPal = async (userEmail) => {
        const paypalPopupPromise = this.page.waitForEvent('popup');
        await this.page
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
        await this.page.getByRole('button', { name: 'No thanks, continue', exact: true }).click();
        await this.page.getByRole('button', { name: 'Save and continue', exact: true }).click();
    }
}
