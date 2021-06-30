import RestaurantDbSource from '../../data/restaurantdb-sources';
import { createElementTemplate, createRestaurantItemTemplate } from '../templates/template-creator';
import Loading from './helper/loading';
import HelperRenderPage from './helper/helper';

const HomePage = {
  async render() {
    return `
      <div id="hero">
        <picture>
          <source media="(max-width: 600px)" srcset="./heros/hero-image_2-small.jpg">
          <img data-src="./heros/hero-image_2-large.jpg" alt="hero image" class="hero-image lazyload"/>
        </picrure>
        <div class="hero">
          <div class="hero-description">
            <h2 tabindex="0">Good food and great vibes.</h2>
            <p tabindex="0">enjoy specialties in the best restaurants!</p>
            <a href="#restaurants">Explore Now!</a>
          </div>
        </div>
      </div>
      <div class="content">
        <h2 class="content__heading">Explore Restaurant</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurants');
    try {
      const restaurants = await RestaurantDbSource.listRestaurants();
      if (restaurants.ok === false) throw restaurants.status;
      if (restaurants.error) throw restaurants.message;

      HelperRenderPage.init({
        container: restaurantContainer,
        data: restaurants,
        template: createRestaurantItemTemplate,
      });
    } catch (error) {
      Loading._showLoadingIndicator(false);
      restaurantContainer.innerHTML = createElementTemplate({
        text: `Error ${error} !`,
        element: 'h2',
        className: 'fail-request',
      });
    }
  },
};

export default HomePage;
