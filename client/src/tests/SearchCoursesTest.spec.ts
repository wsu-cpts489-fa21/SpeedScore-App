import {test, expect} from '@playwright/test';
import { matchers } from 'expect-playwright';

expect.extend(matchers);

// Mouse click.
test ('SearchCourses test', async ({page}) => {
    await page.goto('http://localhost:3000/');

    // Variable declaration.
    const email = await page.$('#email');
    const password = await page.$('#password');
    const loginBtn = await page.$('#loginBtn');
    const coursesMode = await page.$('#coursesMode');
    const searchBtn = await page.$('#searchBtn');
    const searchBox = await page.$('#searchBox');
    const searchBoxCancelBtn = await page.$('#searchBoxCancelBtn');
    const coursesEditBtn0 = await page.$('#coursesEditBtn0');
    const coursesEditBtn1 = await page.$('#coursesEditBtn1');
    const coursesEditBtn2 = await page.$('#coursesEditBtn2');

    // Tests.
    // Login to SpeedScore.
    await page.fill('#email', 'BobManager@gmail.com');
    await page.fill('#password', 'Washington2021');
    await page.click('#loginBtn');

    // Click on 'Courses' tab.
    await page.click('#coursesMode');

    // Click on search button.
    await page.click('#searchBtn');

    // Fill search bar with Palouse Ridge.
    await page.fill('#searchBox', 'Palouse Ridge');
    let visible = await page.isVisible('coursesEditBtn0');
    expect(visible).toBeTruthy();
    visible = await page.isVisible('coursesEditBtn1');
    expect(visible).toBeFalsy();
    visible = await page.isVisible('coursesEditBtn2');
    expect(visible).toBeFalsy();

    // Click on 'cancel' button.
    await page.click('#searchBoxCancelBtn');
    visible = await page.isVisible('coursesEditBtn0');
    expect(visible).toBeTruthy();
    visible = await page.isVisible('coursesEditBtn1');
    expect(visible).toBeTruthy();
    visible = await page.isVisible('coursesEditBtn2');
    expect(visible).toBeTruthy();

});