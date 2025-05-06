export class OptinsPage {
    constructor(page) {
        this.page = page;
    }

    selectOptins = async () => {
        await this.page.getByRole('button', { name: 'Save and continue', exact: true }).click();
    }
}