// @ts-check
const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../pages/signUpPage');

let signUpPage;

test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
  await signUpPage.open();
});

test('Sign Up with valid data', async ({ page }) => {
        await signUpPage.register('first', 'last', 'hanna+507@gaem.io','999999209','Tester_123' );
        await expect(page).toHaveURL('https://brands.gaem.io/deposits', {timeout: 5000})
});

