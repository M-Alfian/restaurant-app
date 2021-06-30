import API_ENDPOINT from '../globals/api-endpoint';
import Loading from '../views/pages/helper/loading';

class RestaurantDbSource {
  static async listRestaurants() {
    Loading._showLoadingIndicator(true);
    const response = await fetch(API_ENDPOINT.HOME_PAGE);
    if (!response.ok) return response;

    const responseJson = await response.json();
    Loading._showLoadingIndicator(false);
    if (!responseJson.error) return responseJson.restaurants;
    console.log(responseJson);
    return responseJson;
  }

  static async detailRestaurant(id) {
    Loading._showLoadingIndicator(true);
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    if (!response.ok) return response;
    const responseJson = await response.json();
    Loading._showLoadingIndicator(false);
    if (!responseJson.error) return responseJson.restaurant;
    return responseJson;
  }

  static async searchRestaurant(query) {
    Loading._showLoadingIndicator(true);
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    Loading._showLoadingIndicator(false);
    return responseJson;
  }
}

export default RestaurantDbSource;
