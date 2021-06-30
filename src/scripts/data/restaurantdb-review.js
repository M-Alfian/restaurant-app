import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';
import Loading from '../views/pages/helper/loading';

class RestaurantDbReview {
  static async addReviewHandler({ reviewId, reviewName, reviewMessage }) {
    Loading._showLoadingIndicator(true);
    try {
      const response = await fetch(API_ENDPOINT.POST_REVIEW, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'X-Auth-Token': CONFIG.KEY,
        },
        body: JSON.stringify({
          id: reviewId,
          name: reviewName,
          review: reviewMessage,
        }),
      });
      const responseJson = await response.json();
      Loading._showLoadingIndicator(false);
      return responseJson;
    } catch (error) {
      Loading._showLoadingIndicator(false);
      console.log(error.message);
      return error;
    }
  }
}

export default RestaurantDbReview;
