export class PostPurchasePage {
    constructor(page) {
        this.page = page;
    }

    interactWithPpu = async (isUpSell, isCrossSell) => {
        const upgrade = isUpSell || isCrossSell
        upgrade
            ? await this.page.getByRole('button', { name: 'Upgrade to annual', exact: true }).click()
            : await this.page.getByRole('button', { name: 'No thanks, continue', exact: true }).click();
    }
}