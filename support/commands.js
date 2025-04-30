const { test, expect, selectors } = require('@playwright/test');
import LandingPage from '../pages/landingPage';
import PaymentMode from '../pages/payment_mode';
import SuccessPage from '../pages/successPage';

export async function completePaypalPurchase({ page, userEmail }) {

    const landingPage = new LandingPage(page)
    const paymentMode = new PaymentMode(page)
    const successPage = new SuccessPage(page)
    selectors.setTestIdAttribute('data-cy');
    // brands to navigate to offer page
    await landingPage.navigate();

    // Select paypal payment mode and purchase with paypal account
    await paymentMode.selectPaypal();
    await paymentMode.payPal();
    await paymentMode.purchaseThroughPayPal(userEmail);

    // verify after paypal purchase
    await successPage.verifySuccessPage();
}

