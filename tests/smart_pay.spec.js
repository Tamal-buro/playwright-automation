const { test, expect, selectors } = require('@playwright/test');
import LandingPage from '../pages/landingPage';
import PaymentMode from '../pages/payment_mode';
import ChargebeeUtlis from '../utils/chargebee-utils';
import SuccessPage from '../pages/successPage';
import { completePaypalPurchase } from '../support/commands'

let userEmail = 'sb-msvw58545680@mailinator.com';

test.describe('Buy Digital + Print Offer', () => {
    test('Pay with Paypal', async ({ page }) => {
        test.slow();
        await completePaypalPurchase({
            page, userEmail
        })

    });

    test.afterAll('CharegbeeDelete', async ({ }) => {
        const chargebeeUtlis = new ChargebeeUtlis()
        await chargebeeUtlis.deleteChargebeeCustomerData(userEmail)
    })

});
