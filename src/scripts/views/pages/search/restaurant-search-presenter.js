class RestaurantSearchPresenter {
  constructor({ restaurantDb }) {
    this._listenToSearchRequestByUser();
    this._restaurantDb = restaurantDb;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.querySelector('#query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchRestaurant(event.target.value);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();
    const foundRestaurants = await this._restaurantDb.searchRestaurant(this.latestQuery);
    this._showFoundRestaurants(foundRestaurants);
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundRestaurants(restaurants) {
    const html = restaurants.reduce(
      (carry, restaurant) => carry.concat(`
          <div class="restaurant">
            <div class="restaurant-name">${restaurant.name}</div>
          </div>
        `),
      '',
    );
    document.querySelector('#mainSearchContent').innerHTML = html;

    document.querySelector('#searchDrawer')
      .dispatchEvent(new Event('restaurants:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default RestaurantSearchPresenter;
