const { test, expect, selectors } = require('@playwright/test');
const WAIT_FOR_PAGE_LOAD = 20000;

export default class SuccessPage {
    constructor(page) {
        this.page = page;
    }
    verifySuccessPage = async () => {
        expect(this.page.getByText(/Paypal Express Checkout/i)).toBeVisible();
    };
};
