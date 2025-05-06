const { test, expect, selectors } = require('@playwright/test');
import LandingPage from '../pages/landingPage';
import PaymentMode from '../pages/payment_mode';
import SuccessPage from '../pages/successPage';
import { PostPurchasePage } from '../pages/post-purchase-page';
import { OptinsPage } from '../pages/optins-page';

export async function completePaypalPurchase({ page, userEmail, brand, selectOffer, isUpSell, isCrossSell }) {

    const landingPage = new LandingPage(page)
    const paymentMode = new PaymentMode(page)
    const successPage = new SuccessPage(page)
    const postPurchasePage = new PostPurchasePage(page)
    const optinsPage = new OptinsPage(page)

    selectors.setTestIdAttribute('data-cy');
    // brands to navigate to offer page
    await landingPage.navigate(brand);

    // Select paypal payment mode and purchase with paypal account
    await paymentMode.selectOffer(selectOffer);
    await paymentMode.payPal();
    await paymentMode.purchaseThroughPayPal(userEmail);

    console.log("isUpSell",brand.isUpSell)
    console.log("isCrossSell",brand.isCrossSell)
    //post purchase screen
    if(brand.isUpSell || brand.isCrossSell)
    await postPurchasePage.interactWithPpu(isUpSell, isCrossSell);

    // select optins
    await optinsPage.selectOptins();

    // verify after paypal purchase
    await successPage.verifySuccessPage();
}
