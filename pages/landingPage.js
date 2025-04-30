export default class LandingPage {
    constructor(page) {
        this.page = page;
    }
    navigate = async () => {
        await this.page.goto('https://stg.newyorker.com/v2/offers/tny-ppu-demo');
        return this
    }
}