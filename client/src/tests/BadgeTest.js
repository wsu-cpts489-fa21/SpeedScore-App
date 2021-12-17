import { ClientFunction, Selector, t } from "testcafe";

const email = Selector('#email');
const password = Selector('#password');

fixture `BadgeSystemTest`
    .page `http://localhost:3000/`

    test ('UnlockingBadgeTest', async t => {
        await t
            // Login.
            .typeText(email, 'BobManager@gmail.com')
            .typeText(password, 'Washington2021')
            .click('#loginBtn')
            .expect(Selector('#profileBtn').visible).eql(true)
    
            // Go to Rounds mode.
            .click('#roundsMode')
            .expect(Selector('#roundsModeActionBtn', {timeout: 10}).visible).eql(true)
        
            // Go to Rounds Form to add round.
            .click('#roundsModeActionBtn')
            .expect(Selector('#logRoundForm', {timeout: 10}).visible).eql(true)
            .typeText(Selector('#roundCourse'), 'Birch Hills')
            .click('#roundFormSubmitBtn')
            .expect(Selector('#logRoundForm').visible).eql(false)
    
            // Check for pop-up modal.
            .expect(Selector('#newBadgeModal').visible).eql(true)
            .expect(Selector('#newBadgeGreenCheckBox0', {timeout: 10}).visible).eql(true)
    
            // Check if badge gets displayed on selecting.
            .click('#newBadgeGreenCheckBox0')
            .click('#newBadgeGreenCheckBox1')
            .click('#newBadgeGreenCheckBox2')
            .expect(Selector('#newBadgeRedCheckBox0', {timeout: 10}).visible).eql(true)
            .expect(Selector('#newBadgeRedCheckBox1', {timeout: 10}).visible).eql(true)
            .expect(Selector('#newBadgeRedCheckBox2', {timeout: 10}).visible).eql(true)
            // Green check boxes should be hidden.
            .expect(Selector('#newBadgeGreenCheckBox0', {timeout: 10}).visible).eql(false)
            .expect(Selector('#newBadgeGreenCheckBox1', {timeout: 10}).visible).eql(false)
            .expect(Selector('#newBadgeGreenCheckBox2', {timeout: 10}).visible).eql(false)
            .expect(Selector('#badgeImg0', {timeout: 10}).visible).eql(true)
            .expect(Selector('#badgeImg1', {timeout: 10}).visible).eql(true)
            .expect(Selector('#badgeImg2', {timeout: 10}).visible).eql(true)
    
            // Check if badge can be removed from the display.
            .click('#newBadgeRedCheckBox0')
            .click('#newBadgeRedCheckBox1')
            .click('#newBadgeRedCheckBox2')
            .expect(Selector('#newBadgeGreenCheckBox0', {timeout: 10}).visible).eql(true)
            .expect(Selector('#newBadgeGreenCheckBox1', {timeout: 10}).visible).eql(true)
            .expect(Selector('#newBadgeGreenCheckBox2', {timeout: 10}).visible).eql(true)
            // Red check boxes should be hidden.
            .expect(Selector('#newBadgeRedCheckBox0', {timeout: 10}).visible).eql(false)
            .expect(Selector('#newBadgeRedCheckBox1', {timeout: 10}).visible).eql(false)
            .expect(Selector('#newBadgeRedCheckBox2', {timeout: 10}).visible).eql(false)
            .expect(Selector('#badgeImg0', {timeout: 10}).visible).eql(false)
            .expect(Selector('#badgeImg1', {timeout: 10}).visible).eql(false)
            .expect(Selector('#badgeImg2', {timeout: 10}).visible).eql(false)
    
    });

test ('AddingBadgeTest', async t => {
    
    await t
        // Login.
        .typeText(email, 'BobManager@gmail.com')
        .typeText(password, 'Washington2021')
        .click('#loginBtn')
        .expect(Selector('#profileBtn').visible).eql(true)

        // Go to Badges mode.
        .click('#badgesMode')
        .expect(Selector('#badge0', {timeout: 10}).visible).eql(true)

        // Display pop-up modal
        .click('#badge0')
        .expect(Selector('#BadgeModal', {timeout: 10}).visible).eql(true)
        .expect(Selector('#greenCheckBox', {timeout: 10}).visible).eql(true)

        // Click on green check box and check if a badge gets displayed.
        .click('#greenCheckBox')
        .expect(Selector('#redCheckBox', {timeout: 10}).visible).eql(true)
        .expect(Selector('#badgeImg0', {timeout: 10}).visible).eql(true)
});

test ('RemoveBadgeTest', async t => {

    await t
        // Login.
        .typeText(email, 'BobManager@gmail.com')
        .typeText(password, 'Washington2021')
        .click('#loginBtn')
        .expect(Selector('#profileBtn').visible).eql(true)

        // Go to Badges mode.
        .click('#badgesMode')
        .expect(Selector('#badge0', {timeout: 10}).visible).eql(true)

        // Display pop-up modal
        .click('#badge0')
        .expect(Selector('#BadgeModal', {timeout: 10}).visible).eql(true)
        .expect(Selector('#greenCheckBox', {timeout: 10}).visible).eql(false)
        .expect(Selector('#redCheckBox', {timeout: 10}).visible).eql(true)

        // Remove a badge.
        .click('#redCheckBox')
        .expect(Selector('#greenCheckBox', {timeout: 10}).visible).eql(true)
        .expect(Selector('#redCheckBox', {timeout: 10}).visible).eql(false)
        .expect(Selector('#badgeImg0', {timeout: 10}).visible).eql(false)
});