import RestaurantDbReview from '../data/restaurantdb-review';
import { createReviewStatusTemplate } from '../views/templates/template-creator';

const ReviewInitiator = {
  init({ button, review }) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      this._renderNotificationPopup();
    });
    this._review = review;
  },

  async _addReviewToServer() {
    const { id } = this._review;
    const userName = document.querySelector('#name').value;
    const userReview = document.querySelector('#review-message').value;
    const responseServer = await RestaurantDbReview.addReviewHandler({
      reviewId: id,
      reviewName: userName,
      reviewMessage: userReview,
    });
    return responseServer;
  },

  async _renderNotificationPopup() {
    const response = await this._addReviewToServer();
    const reviewContainer = document.querySelector('#reviewStatus');
    reviewContainer.innerHTML = createReviewStatusTemplate(response);
    setTimeout(() => {
      reviewContainer.innerHTML = null;
      // eslint-disable-next-line no-restricted-globals
      if (!response.error) location.reload();
    }, 2000);
  },
};

export default ReviewInitiator;
