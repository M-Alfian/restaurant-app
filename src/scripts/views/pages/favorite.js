import FavoriteRestaurantIdb from '../../data/favorite-idb';
import { createRestaurantItemTemplate, createElementTemplate } from '../templates/template-creator';
import Loading from './helper/loading';
import HelperRenderPage from './helper/helper';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Favorite Restaurant</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurants');
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      if (restaurants.length === 0) {
        restaurantContainer.innerHTML += createElementTemplate({
          text: 'sorry you have not added your favorite restaurant',
          element: 'h4',
          className: 'no_favorite',
        });
      }

      HelperRenderPage.init({
        container: restaurantContainer,
        data: restaurants,
        template: createRestaurantItemTemplate,
      });
    } catch (error) {
      Loading._showLoadingIndicator(false);
      restaurantContainer.innerHTML = createElementTemplate({
        text: 'Request failed ! please reload page',
        element: 'h2',
        className: 'fail-request',
      });
    }
  },
};

export default Favorite;
