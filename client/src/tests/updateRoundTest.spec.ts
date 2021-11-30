import {test, expect} from '@playwright/test';
import { matchers } from 'expect-playwright';

expect.extend(matchers);

// // Mouse click.
// test ('UpdateRound test', async ({page}) => {
//     await page.goto('http://localhost:3000/');

//     // Variable declaration.
//     const email = await page.$('#email');
//     const password = await page.$('#password');
//     const loginBtn = await page.$('#loginBtn');
//     const roundsPage = await page.$('#roundsMode'); 
//     const logRound = await page.$('#mode-page-btn action-dialog action-button');
//     const roundDate = await page.$('#roundDate');
//     const roundCourse = await page.$('#roundCourse');
//     const roundType = await page.$('#roundType');
//     const roundHoles = await page.$('#roundHoles');
//     const roundStrokes = await page.$('#roundStrokes');
//     const roundMinutes = await page.$('#roundMinutes');
//     const roundSeconds = await page.$('#roundSeconds');
    

//     // Tests.
//     // Login to SpeedScore.
//     await page.fill('#email', 'test@domain.com');
//     await page.fill('#password', 'Testing123');
//     await page.click('#loginBtn');

//     //Log round
//     // await page.click('#roundsMode');
//     // await page.click('#Log Round');
//     // await page.fill('#roundCourse', 'test');
//     // await page.fill('#roundType', 'Practice');
//     // await page.fill('#roundHoles', '18');
//     // await page.fill('#roundStrokes', '80');
//     // await page.fill('#roundMinutes', '60');
//     // await page.fill('#roundSeconds', '00');
//     // await page.click('#mode-page-btn action-dialog action-button');

//     //Update round with 69 strokes in 55 mins and 20 sec.
//     await page.click('button >> nth=6');
//     await page.fill('#roundCourse', 'updated');
//     await page.fill('#roundType', 'Practice');
//     await page.fill('#roundHoles', '18');
//     await page.fill('#roundStrokes', '69')
//     await page.fill('#roundMinutes', '55');
//     await page.fill('#roundSeconds', '20');
//     await page.click('#mode-page-btn action-dialog action-button');
// });

// Keyboard test.
test ('EditRound keyboard test', async ({page}) => {
    await page.goto('http://localhost:3000/');

    // Variable declaration.
    const email = await page.$('#email');
    const password = await page.$('#password');
    const loginBtn = await page.$('#loginBtn');
    const roundsPage = await page.$('#roundsMode'); 
    const logRound = await page.$('#mode-page-btn action-dialog action-button');
    const roundDate = await page.$('#roundDate');
    const roundCourse = await page.$('#roundCourse');
    const roundType = await page.$('#roundType');
    const roundHoles = await page.$('#roundHoles');
    const roundStrokes = await page.$('#roundStrokes');
    const roundMinutes = await page.$('#roundMinutes');
    const roundSeconds = await page.$('#roundSeconds');

    // Tests.
    // Login to SpeedScore.
    await page.focus('#email');
    await expect(email).toHaveFocus();
    await page.fill('#email', 'test@domain.com');
    await page.keyboard.press('Tab');
    await page.fill('#password', 'Testing123');
    await page.keyboard.press('Tab');
    await expect(loginBtn).toHaveFocus();
    await page.keyboard.press('Enter');

    // Select the first round and update name to updated2 strokes to 50 and time to 45 mins and 30 sec.
    await page.click('#roundsMode');
    //await expect(roundsPage).toHaveFocus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.fill('#roundCourse', 'updated');
    await page.fill('#roundStrokes', '50')
    await page.fill('#roundMinutes', '45');
    await page.fill('#roundSeconds', '30');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

});