// @ts-check
const { test, expect } = require('@playwright/test');
const { DepositPage } = require('../pages/depositPage');
const { LoginPage } = require('../pages/loginPage');
const { users } = require('../test-data/users');

let depositPage;
let loginPage;
let user = users.deposit;


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await page.waitForTimeout(3000);
    depositPage = new DepositPage(page);
  });

test('Crypto deposit', async ({ page }) => {
    await depositPage.open();
    await depositPage.selectCrypto();
    await page.waitForTimeout(3000);
    await depositPage.clickDepositButton();
    await expect(page.getByText('Complete the transaction', { exact: true })).toBeVisible();
});
