const { test, expect, selectors } = require('@playwright/test');
import LandingPage from '../pages/landingPage';
import PaymentMode from '../pages/payment_mode';
import ChargebeeUtlis from '../utils/chargebee-utils';
import SuccessPage from '../pages/successPage';

let userEmail = 'sb-msvw58545680@mailinator.com';

test.describe('Buy Digital + Print Offer', () => {
    test('Pay with Paypal', async ({ page }) => {
        const landingPage = new LandingPage(page)
        const paymentMode = new PaymentMode(page)
        const successPage = new SuccessPage(page)
        selectors.setTestIdAttribute('data-cy');
        await landingPage.navigate(page);
        test.slow();

        await paymentMode.selectPaypal(page);
        await paymentMode.payPal(page);
        await paymentMode.purchaseThroughPayPal(page, userEmail);
        await successPage.verifySuccessPage(page);

    });

    test.afterAll('CharegbeeDelete', async ({}) => {
        const chargebeeUtlis = new ChargebeeUtlis()
        await chargebeeUtlis.deleteChargebeeCustomerData(userEmail)
    })

});
