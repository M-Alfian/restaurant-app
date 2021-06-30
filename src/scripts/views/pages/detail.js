import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-sources';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import ReviewInitiator from '../../utils/review-initiator';
import Loading from './helper/loading';
import {
  createReviewFormTemplate,
  createDetailRestaurantTemplate,
  createRewiewItemTemplate,
  createElementTemplate,
} from '../templates/template-creator';
import FavoriteRestaurantIdb from '../../data/favorite-idb';

const Detail = {
  async render() {
    return `
    <div id="restaurants" class="restaurant">
    </div>
    <div class="detail-container__bottom">
    <div class="categories">
    <div id="categories"></div>
    </div>
    <div class="menu-list">
    <div id="foods-list" class="foods-list"></div>
    <div id="drinks-list" class="drinks-list"></div>
    </div>
    <div class="review-container">
    <div id="reviewStatus" class="review-status-hidden__container"></div>
    <div id="review-form" class="review-form"></div>
    <div id="review" class="review"></div>
    </div>
    <div id="favoriteButtonContainer"></div>
    </div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
      if (restaurant.ok === false) throw restaurant.status;
      if (restaurant.error) throw restaurant.message;

      const { categories, menus, customerReviews } = restaurant;
      this._renderRestaurant(restaurant);
      this._renderCategories(categories);
      this._renderMenuList(menus);
      this._renderReviewList(customerReviews);

      ReviewInitiator.init({
        button: document.querySelector('#send-review-button'),
        review: restaurant,
      });

      FavoriteButtonPresenter.init({
        favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          city: restaurant.city,
        },
      });
    } catch (error) {
      Loading._showLoadingIndicator(false);
      this._renderError(error);
    }
  },

  _renderRestaurant(restaurant) {
    const restaurantContainer = document.querySelector('#restaurants');
    restaurantContainer.innerHTML = createDetailRestaurantTemplate(restaurant);
  },

  _renderCategories(categories) {
    const categoriesContainer = document.querySelector('#categories');
    categoriesContainer.innerHTML += createElementTemplate({
      text: 'categories',
      element: 'h4',
      className: 'categories-title',
    });

    categories.forEach((categorie) => {
      categoriesContainer.innerHTML += createElementTemplate({
        text: categorie.name,
        element: 'p',
        className: 'categories-list-item',
      });
    });
  },

  _renderMenuList(menus) {
    const { foods, drinks } = menus;
    const foodsContainer = document.querySelector('#foods-list');
    const drinksContainer = document.querySelector('#drinks-list');

    foodsContainer.innerHTML += createElementTemplate({
      text: 'Foods List',
      element: 'h4',
    });

    foods.forEach((food) => {
      foodsContainer.innerHTML += createElementTemplate({
        text: food.name,
        element: 'p',
        className: 'foods-list-item',
      });
    });

    drinksContainer.innerHTML += createElementTemplate({
      text: 'Drinks List',
      element: 'h4',
    });

    drinks.forEach((drink) => {
      drinksContainer.innerHTML += createElementTemplate({
        text: drink.name,
        element: 'p',
        className: 'drinks-list-item',
      });
    });
  },

  _renderReviewList(customerReviews) {
    const reviewContainer = document.querySelector('#review');
    const addReviewFormContainer = document.querySelector('#review-form');

    reviewContainer.innerHTML += createElementTemplate({
      text: 'Customer Review',
      element: 'h4',
      className: 'customer-review__header_text',
    });

    addReviewFormContainer.innerHTML = createReviewFormTemplate();
    customerReviews.forEach((review) => {
      reviewContainer.innerHTML += createRewiewItemTemplate(review);
    });
  },

  _renderError(status) {
    const restaurantContainer = document.querySelector('#restaurants');
    restaurantContainer.innerHTML = createElementTemplate({
      text: `Erorr ${status} !`,
      element: 'h2',
      className: 'fail-request',
    });
  },

};

export default Detail;
