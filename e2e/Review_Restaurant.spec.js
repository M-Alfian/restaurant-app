/* eslint-disable no-undef */
Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  I.forceClick(locate('.restaurant__title a').first());
});

Scenario('add review to the restaurant', async ({ I }) => {
  I.fillField('#name', 'autotest-x');
  I.fillField('#review-message', 'review x');
  const reviewMessage = await I.grabValueFrom('#review-message');
  I.seeElement('#send-review-button');
  I.click('#send-review-button');

  I.waitForText('Success', 3);
  I.see(reviewMessage, '.review-item');
});

Scenario('add review fails if the user does not fill in the review message input', ({ I }) => {
  I.fillField('#name', 'name test');
  I.seeInField('#review-message', '');

  I.seeElement('#send-review-button');
  I.click('#send-review-button');
  I.waitForText('Error', 3);
  I.dontSee('name test', '.review-item');
});

Scenario('add review fails if the user does not fill in the name input', ({ I }) => {
  I.seeInField('#name', '');
  I.fillField('#review-message', 'test review');

  I.seeElement('#send-review-button');
  I.click('#send-review-button');
  I.waitForText('Error', 3);
  I.dontSee('test review', '.review-text');
});
