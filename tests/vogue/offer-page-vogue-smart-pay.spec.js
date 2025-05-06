const { test, expect, selectors } = require('@playwright/test');
import ChargebeeUtlis from '../../utils/chargebee-utils';
import { completePaypalPurchase } from '../../support/commands'
import { vogueBrand } from '../../fixtures/brands-data-stag.json'

let userEmail = vogueBrand.vogueClub.userEmail;
let brand = vogueBrand.vogueClub
let selectOffer = brand.offer.offer2.name

test.describe('Buy Digital + Print Offer', () => {
    test('Pay with Paypal', async ({ page }) => {
        test.slow();
        await completePaypalPurchase({
            page, userEmail, brand, selectOffer
        })

    });

    test.afterAll('CharegbeeDelete', async ({ }) => {
        const chargebeeUtlis = new ChargebeeUtlis()
        await chargebeeUtlis.deleteChargebeeCustomerData(userEmail)
    })

});