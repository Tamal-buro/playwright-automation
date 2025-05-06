const { test, expect, selectors } = require('@playwright/test');
import ChargebeeUtlis from '../../utils/chargebee-utils';
import { completePaypalPurchase } from '../../support/commands'
import { tnyBrand } from '../../fixtures/brands-data-stag.json'

let userEmail = tnyBrand.tny.userEmail;
let brand = tnyBrand.tny

test.describe('Buy Digital + Print Offer', () => {
    test('Pay with Paypal', async ({ page }) => {
        test.slow();
        await completePaypalPurchase({
            page, userEmail, brand
        })

    });

    test.afterAll('CharegbeeDelete', async ({ }) => {
        const chargebeeUtlis = new ChargebeeUtlis()
        await chargebeeUtlis.deleteChargebeeCustomerData(userEmail)
    })

});
