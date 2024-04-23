// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('Login with valid data', async ({ page }) => {
        await loginPage.login('hanna@gaem.io', 'Tester_123');
        await expect(page.getByText('Welcome Test')).toBeVisible();
});

test('Login with invalid email data', async ({ page }) => {
        await loginPage.login('hanna1@gaem.io', 'Tester_123');
        await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
});

test('Login with invalid password data', async ({ page }) => {
  await loginPage.login('hanna@gaem.io', 'Tester_1234');
  await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
});
