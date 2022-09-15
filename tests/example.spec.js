// @ts-check
const {test, expect} = require('@playwright/test');

test('homepage has Trending Movie/TV and SignIn/SignUp links work', async ({page}) => {
    await page.goto('http://localhost:3000');

    // Expect a Trending titles "to contain" a substring.
    const trendingTv = await page.locator('text=Trending TV');
    await expect(trendingTv).toBeVisible();
    const trendingMovie = await page.locator('text=Trending Movie');
    await expect(trendingMovie).toBeVisible();

    // create locators for the SignIn and SignUp links
    const signUp = page.locator('text=Sign Up');
    const signIn = page.locator('text=Sign In');

    // Expect an attribute "to be strictly equal" to the value.
    await expect(signUp).toHaveAttribute('href', '/signUp');
    await expect(signIn).toHaveAttribute('href', '/signIn');

    // Click the get started link.
    await signUp.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*signUp/);
    await page.goto('http://localhost:3000');

    await signIn.click();
    await expect(page).toHaveURL(/.*signIn/);
});
