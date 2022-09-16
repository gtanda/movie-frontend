// @ts-check
const {test, expect} = require('@playwright/test');

test.describe('Profile Page', () => {

    test.beforeEach(async ({page}) => {
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

        // Click text=Profile
        await page.locator('text=Profile').click();
        await expect(page).toHaveURL('http://localhost:3000/profile');
    });

    test.afterEach(async ({page}) => {
        // Click text=Logout
        await page.locator('text=Logout').click();
        await expect(page).toHaveURL('http://localhost:3000/');
    });

    test('update username', async ({page}) => {
        // Click [placeholder="enter new username"]
        await page.locator('[placeholder="enter new username"]').click();
        // Fill [placeholder="enter new username"]
        await page.locator('[placeholder="enter new username"]').fill('gta23');
        // Click button:has-text("Update Username")
        await page.locator('button:has-text("Update Username")').click();
        // Welcome text changed to updated username
        await expect(page.locator('text=Welcome gta23!')).toBeVisible();

        await page.locator('[placeholder="enter new username"]').fill('testuser');
        // Click button:has-text("Update Username")
        await page.locator('button:has-text("Update Username")').click();
    });

    test('update email', async ({page}) => {
        // Click [placeholder="enter new email"]
        await page.locator('[placeholder="enter new email"]').click();
        // Fill [placeholder="enter new email"]
        await page.locator('[placeholder="enter new email"]').fill('updatedemail@emil.ca');
        // Click button:has-text("Update Email")
        await page.locator('button:has-text("Update Email")').click();
        // Click text=Email updated successfully
        await page.locator('text=Email updated successfully').click();
    });
});
