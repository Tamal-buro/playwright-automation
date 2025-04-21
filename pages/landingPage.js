export default class LandingPage {
    navigate = async (page) => {
        await page.goto('https://stg.newyorker.com/v2/offers/tny-ppu-demo');
        return this
    }
}

export const landingPage = new LandingPage();