const { test, expect, selectors } = require('@playwright/test');
const WAIT_FOR_PAGE_LOAD = 20000;

export default class SuccessPage {
    verifySuccessPage = async (page) => {
        expect(page.getByText(/Paypal Express Checkout/i)).toBeTruthy();
    };
};

export const successPage = new SuccessPage();