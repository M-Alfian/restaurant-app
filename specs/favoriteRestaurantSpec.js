import FavoriteRestaurantIdb from '../src/scripts/data/favorite-idb';
import * as TestFactories from './helpers/testFactories';

describe('favorite restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  const addButtonEventSimulation = (eventType) => {
    document.querySelector('#favoriteButton').dispatchEvent(new Event(eventType));
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show favorite button when the restaurant has not been added before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="add to favorite"]'))
      .toBeTruthy();
  });

  it('should not show favorite button when the restaurant has not been added before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove from favorite"]'))
      .toBeFalsy();
  });

  it('should be able to add the favorite restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    addButtonEventSimulation('click');
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add the restaurant again when its already added', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    addButtonEventSimulation('click');

    expect(await FavoriteRestaurantIdb.getAllRestaurants())
      .toEqual([{ id: 1 }]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add the restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({});
    addButtonEventSimulation('click');

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
