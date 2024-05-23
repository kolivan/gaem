const { BasePage } = require("./basePage");
exports.DepositPage = class DepositPage extends BasePage {

    constructor(page) {
        super(page, '/deposits');
        this.email = page.getByPlaceholder('Email');
        this.depositButton = page.getByRole('button', { name: 'Deposit 25 EUR' });
        this.useBonusSwitcher = page.locator('[id="use-bonus"]');
        this.plusButton = page.locator('[href=#depositOffcanvas]');
        this.cryptoMethod = page.locator('[alt="Crypto Payments"]').last();
    }

    async clickDepositButton() {
        await this.depositButton.click();
    }

    async openLoginPage() {
        await this.loginLink.click();
    }

    async selectCrypto() {
        await this.cryptoMethod.click();
    }

}