// @ts-check
const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../pages/signUpPage');
const { users } = require('../test-data/users');

let signUpPage;
let user = users.registration;

/*test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  await signUpPage.open();
});*/

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'CF-IPCOUNTRY': 'BG' // Set the header value you need
    }
  });
  const page = await context.newPage();
  signUpPage = new SignUpPage(page);
  await signUpPage.open();
});

test('Sign Up with valid data', async ({ page }) => {
  await signUpPage.register(user.firstName, user.lastName, user.email, user.phone, user.password);
  await expect(page).toHaveURL(new RegExp('/.*\/deposits/*'))
});
/*
test('Open Terms and Conditions from Registration form', async ({ page }) => {
  await signUpPage.openTermsConditionsPage();
  const newTabPromise = page.waitForEvent("popup");
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();
  await expect(newTab).toHaveURL(new RegExp('/.*\/terms'))
});

test('Open Privacy Policy from Registration form', async ({ page }) => {
  await signUpPage.openPrivacyPolicyPage();
  const newTabPromise = page.waitForEvent("popup");
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();
  await expect(newTab).toHaveURL(new RegExp('/.*\/privacy-policy'))
});

test('Open Login page from Registration form', async ({ page }) => {
  await signUpPage.openLoginPage();
  await expect(page).toHaveURL(new RegExp('/.*\/login'))
});

test('Registration with unchecked terms and conditions', async ({ page }) => {
  await signUpPage.checkTermsCheckbox();
  await signUpPage.register(user.firstName, user.lastName, user.email, user.phone, user.password);
  await expect(page).toHaveURL(new RegExp('/.*\/sign-up'))
});*/

