// @ts-check
const {test, expect} = require('@playwright/test');

test.describe('Profile Page', () => {
    test('update username', async ({page}) => {
        // Go to http://localhost:3000/
        await page.goto('http://localhost:3000/');

        // Click text=Sign In
        await page.locator('text=Sign In').click();
        await expect(page).toHaveURL(/.*signIn/);

        // Click [placeholder="username"]
        await page.locator('[placeholder="username"]').click();
        // Fill [placeholder="username"]
        await page.locator('[placeholder="username"]').fill('testuser');

        // Click [placeholder="password"]
        await page.locator('[placeholder="password"]').click();
        // Fill [placeholder="password"]
        await page.locator('[placeholder="password"]').fill('testuser');

        // Click button:has-text("Sign In")
        await page.locator('button:has-text("Sign In")').click();
        await expect(page).toHaveURL('http://localhost:3000/');

        // Click text=Profile
        await page.locator('text=Profile').click();
        await expect(page).toHaveURL('http://localhost:3000/profile');

        // Click [placeholder="enter new username"]
        await page.locator('[placeholder="enter new username"]').click();
        // Fill [placeholder="enter new username"]
        await page.locator('[placeholder="enter new username"]').fill('gta');
        // Click button:has-text("Update Username")
        await page.locator('button:has-text("Update Username")').click();

        // Welcome text changed to updated username
        await expect(page.locator('text=Welcome gta!')).toBeVisible();
    })

})
