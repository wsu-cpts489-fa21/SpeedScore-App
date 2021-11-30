import {test, expect} from '@playwright/test';
import { matchers } from 'expect-playwright';

expect.extend(matchers);

// Mouse click.
test ('EditProfile test', async ({page}) => {
    await page.goto('http://localhost:3000/');

    // Variable declaration.
    const email = await page.$('#email');
    const password = await page.$('#password');
    const loginBtn = await page.$('#loginBtn');
    const profileBtn = await page.$('#profileBtn'); 
    const accountAccordion = await page.$('#accountAccordion');
    const securityAnswer = await page.$('#securityAnswer');
    const updateProfileBtn = await page.$('#updateProfileBtn');
    const updateProfileCancelBtn = await page.$('#updateProfileCancelBtn');

    // Tests.
    // Login to SpeedScore.
    await page.fill('#email', 'BobManager@gmail.com');
    await page.fill('#password', 'Washington2021');
    await page.click('#loginBtn');

    // Go to Profile settings and update Security Answer to Hello World.
    await page.click('#profileBtn');
    await page.click('#accountAccordion');
    await page.fill('#securityAnswer', '');
    await page.fill('#securityAnswer', 'Hello World');
    await page.click('#updateProfileBtn');
});

// Key test.
test ('EditProfile keyboard test', async ({page}) => {
    await page.goto('http://localhost:3000/');

    // Variable declaration.
    const email = await page.$('#email');
    const password = await page.$('#password');
    const loginBtn = await page.$('#loginBtn');
    const profileBtn = await page.$('#profileBtn'); 
    const accountAccordion = await page.$('#accountAccordion');
    const securityAnswer = await page.$('#securityAnswer');
    const updateProfileBtn = await page.$('#updateProfileBtn');
    const updateProfileCancelBtn = await page.$('#updateProfileCancelBtn');

    // Tests.
    // Login to SpeedScore.
    await page.focus('#email');
    await expect(email).toHaveFocus();
    await page.fill('#email', 'BobManager@gmail.com');
    await page.keyboard.press('Tab');
    await page.fill('#password', 'Washington2021');
    await page.keyboard.press('Tab');
    await expect(loginBtn).toHaveFocus();
    await page.keyboard.press('Enter');

    // Go to Profile settings and update Security Answer to Hello World.
    await page.focus('#profileBtn');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.fill('#securityAnswer', '');
    await page.fill('#securityAnswer', 'World');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
});