const assert = require('assert');

/* eslint-disable no-undef */
Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('add one favorite restaurant', async ({ I }) => {
  I.see('sorry you have not added your favorite restaurant', '.no_favorite');

  I.amOnPage('/');

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.seeElement('.restaurant__title');
  I.forceClick(firstRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const favoriteRestaurantName = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantName, favoriteRestaurantName);
});

Scenario('add 2 favorite restaurants then remove first favorite restaurant from favorite list', async ({ I }) => {
  I.see('sorry you have not added your favorite restaurant', '.no_favorite');

  I.amOnPage('/');

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstFavoriteRestaurant = await I.grabTextFrom(firstRestaurant);

  I.seeElement('.restaurant__title a');
  I.forceClick(firstRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/');

  const secondRestaurant = locate('.restaurant__title a').at(2);
  const secondFavoriteRestauran = await I.grabTextFrom(secondRestaurant);

  I.seeElement('.restaurant__title');
  I.forceClick(secondRestaurant);
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  I.forceClick(firstRestaurant);
  I.say('I am going to unfavorite this restaurant');
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.say('I expect the restaurant that was added first has been removed');
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  I.dontSee(firstFavoriteRestaurant);
  I.see(secondFavoriteRestauran, '.restaurant__title');
});
