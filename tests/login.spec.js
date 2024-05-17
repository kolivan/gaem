// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { users } = require('../test-data/users');

let loginPage;
let user = users.login;


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('Login with valid data', async ({ page }) => {
        await loginPage.login(user.userWithValidData.email, user.userWithValidData.password);
        await expect(page.getByText('Welcome Test')).toBeVisible();
});

test('Login with invalid email data', async ({ page }) => {
        await loginPage.login(user.userWithInvalidEmail.email, user.userWithInvalidEmail.password);
        await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
});

test('Login with invalid password data', async ({ page }) => {
  await loginPage.login(user.userWithInvalidPassword.email, user.userWithInvalidPassword.password);
  await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
});

test('Click Forgot password Link', async ({ page }) => {
  await loginPage.openForgotPasswordPage();
  await expect(page).toHaveURL(new RegExp('/.*\/forgot-password'))
});

test('Click Sign Up link', async ({ page }) => {
  await loginPage.openSignUpPage();
  await expect(page).toHaveURL(new RegExp('/.*\/sign-up'))
});
