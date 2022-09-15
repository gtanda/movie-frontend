// @ts-check
const {test, expect} = require('@playwright/test');

test('sign up works', async ({page}) => {
    await page.goto('http://localhost:3000/signUp');
    await expect(page).toHaveURL(/.*signUp/);

    // create locators for the email and password fields
    const username = page.locator('#username');
    const email = page.locator('#email');
    const password = page.locator('#password');
    const confirmPassword = page.locator('#confirmPassword');
    const signUpButton = page.locator('#signUpButton');

    // fill in the email and password fields
    await email.fill('testuser@test.ca');
    await username.fill('testuser');
    await password.fill('testuser');
    await confirmPassword.fill('testuser');

    // click the sign-up button
    await signUpButton.click();

    // Expects to redirect to sign in page
    const signInPageUsername = page.locator('#signInUsername');
    const signInPagePassword = page.locator('#signInPassword');
    const signInButton = page.locator('#signInButton');

    // fill in the username and password fields
    await signInPageUsername.fill('testuser');
    await signInPagePassword.fill('testuser');
    await signInButton.click();

    // redirect to home page
    const trendingTv = await page.locator('text=Trending TV');
    await expect(trendingTv).toBeVisible();

    // logout user
    const logoutButton = page.locator('#userLogout');
    await logoutButton.click();
});
