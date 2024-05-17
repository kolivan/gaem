const { BasePage } = require("./basePage");
exports.LoginPage = class LoginPage extends BasePage {

    constructor(page) {
        super(page, '/login');
        this.email = page.getByPlaceholder('Email');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.locator('[id="forgot-password"]');
        this.sighUpLink = page.locator('[id="sign-up"]');
    }

    async login(userEmail, userPassword) {
        await this.email.fill(userEmail);
        await this.password.fill(userPassword);
        await this.loginButton.click();
    }

    async openForgotPasswordPage() {
        await this.forgotPasswordLink.click();
    }

    async openSignUpPage() {
        await this.sighUpLink.click();
    }
}