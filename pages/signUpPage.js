const { BasePage } = require("./basePage");
exports.SignUpPage = class SignUpPage extends BasePage {

    constructor(page) {
        super(page, '/sign-up');
        this.firstName = page.locator('[id="firstname"]');
        this.lastName = page.locator('[id="lastname"]');
        this.email = page.locator('[id="email"]');
        this.phone = page.locator('[id="phone"]');
        this.password = page.locator('[id="password"]');
        this.countrySelector = page.getByLabel('Telephone country code');
        this.countryCodeUA = page.locator ('[id="iti-0__item-ua"]');
        this.signUpButton = page.getByRole('button', { name: 'Create account' });
        this.termsConditionsLink = page.locator('[id="terms-conditions"]');
        this.privacyPolicyLink = page.locator('[id="privacy-policy"]');
        this.loginLink = page.locator('[id="login"]');
        this.termsCheckbox = page.locator('[id="terms"]');
    }

    async register(firstName, lastName,email,phone,password) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.countrySelector.click();
        await this.countryCodeUA.click();
        await this.phone.fill(phone);
        await this.password.fill(password);
        await this.signUpButton.click();
    }
    
    async openTermsConditionsPage() {
        await this.termsConditionsLink.click();
    }

    async openPrivacyPolicyPage() {
        await this.privacyPolicyLink.click();
    }

    async openLoginPage() {
        await this.loginLink.click();
    }

    async checkTermsCheckbox() {
        await this.termsCheckbox.click();
    }
}