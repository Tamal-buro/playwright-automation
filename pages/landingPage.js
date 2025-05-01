export default class LandingPage {
    constructor(page) {
        this.page = page;
    }
    navigate = async (brand) => {
        await this.page.goto(`${brand.baseUrl}/v2/offers/${brand.pageId}`);
        return this
    }
}
