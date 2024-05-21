const { test, expect } = require('@playwright/test');
const { ForgotPasswordPage } = require('../pages/forgotPasswordPage');
const { getResetLinkFromMailtrap, clearMailtrapInbox } = require('../helpers/mailtrapHelper');
const { users } = require('../test-data/users');

let forgotPasswordPage;
let user = users.forgotPassword;

test.beforeEach(async ({ page }) => {
    forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.open();
  });

  test('Forgot Password flow', async ({ page }) => {
    const email = user.email;

    // Step 1: Trigger Forgot Password
    await forgotPasswordPage.sendRequest(email);
  
    // Step 2: Fetch the reset password email from Mailtrap
    let resetLink;
    try {
      resetLink = await getResetLinkFromMailtrap(email);
    } catch (error) {
      console.error('Failed to get reset link:', error);
      throw error;
    }
    
    // Step 3: Complete the password reset using the link from the email
    await page.goto(resetLink);
  
    // Assuming there's a form to reset the password
    await page.fill('[id="new-password"]', 'newSecurePassword');
    await page.click('[id="reset-password-button"]');
  
    // Step 4: Verify the user is redirected to the appropriate page
    await expect(page).toHaveURL(new RegExp('/password-reset-success'));
  
    // Cleanup: Optionally clear emails from Mailtrap
    await clearMailtrapInbox();
  });

