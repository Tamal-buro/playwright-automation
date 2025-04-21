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


}

const paymentMode = new PaymentMode();