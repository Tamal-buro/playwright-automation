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
        const chargebeeUtlis = new ChargebeeUtlis()
        const successPage = new SuccessPage(page)
        selectors.setTestIdAttribute('data-cy');
        await landingPage.navigate(page);
        test.slow();

        await paymentMode.selectPaypal(page);
        await paymentMode.payPal(page);
        await paymentMode.purchaseThroughPayPal(page, userEmail);
        await successPage.verifySuccessPage(page);
        //await chargebeeUtlis.cleanChargebeeTestDtata(userEmail, request)

    });

    test.afterAll('CharegbeeDelete', async ({ request }) => {
        const pass = '';
        const authHeader = `Basic ${Buffer.from(`${'test_H8qd4n9r60iiNB5kjDItE2LymaHjYH7Q'}:${pass}`).toString(
            'base64'
        )}`;

        debugger
        const getUrl = `https://condenast-staging-test.chargebee.com/api/v2/customers?email[is]=${userEmail}&limit=1`;
        const getResponse = await request.get(getUrl, {
            headers: {
                Authorization: authHeader,
            },
        });
        // expect(getResponse.status).toBe(200);
        const data = await getResponse.json();
        console.log('Tamal Response: ', getResponse)

        if (data.list.length > 0) {
            const customerId = data.list[0].customer.id;
            console.log(`Customer ID: ${customerId}`);

            const deleteUrl = `https://condenast-staging-test.chargebee.com/api/v2/customers/${customerId}/delete`;

            const deleteResponse = await fetch(deleteUrl, {
                method: 'POST',
                headers: {
                    Authorization: authHeader,
                },
            });
            expect(deleteResponse.status).toBe(200)
        } else {
            console.log(`No customer found with email: ${userEmail}`);
        }
    })

});
