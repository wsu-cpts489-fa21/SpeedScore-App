import {test, expect} from '@playwright/test';
import { matchers } from 'expect-playwright';

expect.extend(matchers);

// Mouse click test.
test ('Round Media test', async ({page}) => {
    await page.goto('http://localhost:3000/');

    //Declaring all the variables may need.
    const email = await page.$('#email');
    const password = await page.$('#password');
    const loginBtn = await page.$('#loginBtn');
    const roundsMode = await page.$('#roundsMode'); 
    const roundCourse = await page.$('#roundCourse'); 
    const logRound = await page.$('text=Log Round');
    const pictures = await page.$('#pictures');
    const mainPic = await page.$('#roundPictures');
    const videos = await page.$('#videos');
    const videoLinks = await page.$('#videoLinks');
    const logRoundBtn = await page.$('#logRoundBtn');

    //Tests.
    //Loging in to SpeedScore.
    await page.fill('#email', 'test@domain.com');
    await page.fill('#password', 'Testing123');
    await page.click('#loginBtn');

    //Go to rounds mode and log a new round
    await page.click('#roundsMode');
    await page.click('text=Log Round');
    await page.fill('#roundCourse', 'Test Course');
    // Choosing the first photo
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('#pictures')
    ]); 
    await fileChooser.setFiles('/Users/macbook/Documents/CS 489/aphrodite-hills-golf-course.jpg');
    //Choosing the main photo
    await page.click('img:below(:text("500 characters"))');

    await page.screenshot({ path: '/Users/macbook/Documents/CS 489/mainPicTest.png' });
    //Choosing the second photo
    const [fileChooser2] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('#pictures')
    ]);
    await fileChooser2.setFiles('/Users/macbook/Documents/CS 489/golfroundstest2.jpg');
    //Choosing the video
    const [videoChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('#videos'),
    
    ]);
    await videoChooser.setFiles('/Users/macbook/Documents/CS 489/500kb.mp4');
    await page.screenshot({path: '/Users/macbook/Documents/CS 489/videosTest.png' })
    //Entering a youtube link
    await page.fill('#videoLinks', 'https://www.youtube.com/watch?v=Q4hImp32RBc&ab_channel=FunniestCatEver');
    //Logging the round
    await page.click('#logRoundBtn');

    await page.screenshot({ path: '/Users/macbook/Documents/CS 489/finalTest.png' });

});
