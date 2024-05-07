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
    }

    async register(firstName, lastName,email,phone,password) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.countrySelector.click();
        await this.countryCodeUA.click();
        await this.phone.pressSequentially(phone);
        await this.password.fill(password);
        await this.signUpButton.click();
    }

}