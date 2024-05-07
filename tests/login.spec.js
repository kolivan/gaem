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
        await loginPage.login(user.email, user.password);
        await expect(page.getByText('Welcome Test')).toBeVisible();
});

test('Login with invalid email data', async ({ page }) => {
        await loginPage.login('hanna1@gaem.io', user.password);
        await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
});

test('Login with invalid password data', async ({ page }) => {
  await loginPage.login(user.email, 'Tester_1234');
  await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
});
