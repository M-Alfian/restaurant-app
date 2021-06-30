const assert = require('assert');

/* eslint-disable no-undef */
Feature('Search Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('search restaurant by name test', async ({ I }) => {
  I.seeElement('.restaurant-item');
  const restaurantNames = await I.grabTextFromAll('.restaurant__title a');

  restaurantNames.forEach(async (name) => {
    I.seeElement('#searchIconButton');
    I.forceClick('#searchIconButton');
    I.waitForElement('.s-opened');
    I.seeInField('#searchForm', '');
    I.dontSeeElement('#buttonOnSearchBarList');
    I.seeElement('#searchButton');
    I.fillField('#searchForm', name);
    I.seeElement('#searchButton');
    I.forceClick('#searchButton');
    I.see('Search Result :', '.search-title');
    I.seeElement('#buttonOnSearchBarList');
    I.forceClick(locate('#buttonOnSearchBarList').first());
    I.seeElement('.detail-restaurant__title');
    const matchingName = await I.grabTextFrom('.detail-restaurant__title');
    assert.strictEqual(name, matchingName);
  });
});

Scenario('should not return all restaurants if search field is empty', async ({ I }) => {
  I.seeElement('.restaurant-item');
  const restaurantNames = await I.grabTextFromAll('.restaurant__title a');

  I.seeElement('#searchIconButton');
  I.forceClick('#searchIconButton');
  I.waitForElement('.s-opened');

  I.seeInField('#searchForm', '');
  I.seeElement('#searchButton');
  I.forceClick('#searchButton');

  I.see('Search Result :', '.search-title');
  const searchResults = await I.grabTextFromAll('#buttonOnSearchBarList');
  searchResults.forEach((searchName, index) => {
    assert.strictEqual(searchName, restaurantNames[index]);
  });
});

Scenario('search results should not appear when the user clicks the close button and reopens the search tab', ({ I }) => {
  I.seeElement('#searchIconButton');
  I.forceClick('#searchIconButton');
  I.waitForElement('.s-opened');

  I.fillField('#searchForm', 'makan');
  I.seeElement('#searchButton');
  I.forceClick('#searchButton');

  I.see('Search Result :', '.search-title');
  I.seeElement('#buttonOnSearchBarList');
  I.forceClick('#closeButton');

  I.seeElement('#searchIconButton');
  I.click('#searchIconButton');
  I.waitForElement('.s-opened');

  I.seeInField('#searchForm', '');
  I.dontSeeElement('.search-title');
  I.dontSeeElement('#buttonOnSearchBarList');
});
