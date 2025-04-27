const { test, expect, selectors } = require('@playwright/test');
import LandingPage from '../pages/landingPage';
import PaymentMode from '../pages/payment_mode';
import ChargebeeUtlis from '../utils/chargebee-utils';

let userEmail = 'sb-msvw58545680@mailinator.com';

test.describe('Buy Digital + Print Offer', () => {

    // test.afterAll(async ({page,request}) => {
    //     await page.debug()
    //     await chargebeeUtlis.cleanChargebeeTestDtata(userEmail, request)
    // })

    test('Pay with Paypal', async ({ page, request }) => {
        const landingPage = new LandingPage(page)
        const paymentMode = new PaymentMode(page)
        const chargebeeUtlis = new ChargebeeUtlis()
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
        expect(page.getByText(/Paypal Express Checkout/i)).toBeTruthy();
        //await chargebeeUtlis.cleanChargebeeTestDtata(userEmail, request)

    });

    test('CharegbeeDelete', async ({ request }) => {
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
        console.log(getResponse)

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

            // expect(deleteResponse.status).toBe(200);
        } else {
            console.log(`No customer found with email: ${email}`);
        }
    })

});
