const { BasePage } = require("./basePage");
exports.ForgotPasswordPage = class ForgotPasswordPage extends BasePage {

    constructor(page) {
        super(page, '/forgot-password');
        this.email = page.getByPlaceholder('Email');
        this.resetButton = page.getByRole('button', { name: 'Reset password' });
        this.loginLink = page.locator('[id="sign-up"]');
    }

    async sendRequest(userEmail) {
        await this.email.fill(userEmail);
        await this.resetButton.click();
    }

    async openLoginPage() {
        await this.loginLink.click();
    }
}