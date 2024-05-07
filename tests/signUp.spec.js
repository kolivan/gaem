// @ts-check
const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../pages/signUpPage');
const { users } = require('../test-data/users');

let signUpPage;
let user = users.registration;

test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
  await signUpPage.open();
});

test('Sign Up with valid data', async ({ page }) => {
        await signUpPage.register(user.firstName, user.lastName, user.email, user.phone, user.password);
        await expect(page).toHaveURL('https://brands.gaem.io/deposits', {timeout: 5000})
});

