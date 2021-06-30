import API_ENDPOINT from '../../globals/api-endpoint';

const createDetailRestaurantTemplate = (restaurant) => `
  <div class="detail-restaurant">
    <picture>
      <source media="(max-width: 600px)" srcset="${API_ENDPOINT.IMAGES('small')}/${restaurant.pictureId}" type="image/jpeg"}>
      <img data-src="${API_ENDPOINT.IMAGES('medium')}/${restaurant.pictureId}" alt="${restaurant.name}" class="detail-restaurant__img lazyload"/>
    </picture>
    <div class="detail-container">
      <div class="detail-header__container">
        <h2 class="detail-restaurant__title" tabindex="0">${restaurant.name}</h2>
        <p tabindex="0"><i class="fa fa-map-marker"></i> ${restaurant.city}</p>
      </div>
      <div class="detail-header__list">
        <p tabindex="0"><i class="fa fa-home"></i> ${restaurant.address}</p>
        <p tabindex="0"><i class="fa fa-comment"></i> ${restaurant.customerReviews.length} Reviews </p>
        <p tabindex="0"><i class="fa fa-star"></i> ${restaurant.rating} Rating</p>
      </div>
      <div class="detail-description">
        <h4 tabindex="0">Description :</h4>
        <p tabindex="0">${restaurant.description}</p>
      </div>
    </div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
        <img class="restaurant-item__header__poster lazyload" alt="${restaurant.name}"
            data-src="${API_ENDPOINT.IMAGES('small')}/${restaurant.pictureId}">
        <div class="restaurant-item__header__rating">
          <p><span class="restaurant-item__header__rating__score">${restaurant.rating} ⭐️</span></p>
        </div>
        <div class="restaurant-item__header__city">
          <p><i class="fa fa-map-marker"></i> ${restaurant.city}</p>
        </div>
    </div>
    <div class="restaurant-item__content">
        <h3 class="restaurant__title"><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a></h3>
        <p>${restaurant.description}</p>
    </div>
  </div>
`;

const createRestaurantSearchItemTemplate = (restaurant) => `
  <div class="restaurant-wrapper">
    <div class="restaurant-item">
      <div class="restaurant-item__header">
          <img class="restaurant-item__header__poster lazyload" alt="${restaurant.name}"
              data-src="${API_ENDPOINT.IMAGES('small')}/${restaurant.pictureId}">
          <div class="restaurant-item__header__rating">
            <p><span class="restaurant-item__header__rating__score">${restaurant.rating} ⭐️</span></p>
          </div>
          <div class="restaurant-item__header__city">
            <p><i class="fa fa-map-marker"></i> ${restaurant.city}</p>
          </div>
      </div>
      <div class="restaurant-item__content">
          <h3 class"restaurant-name"><a href="${`/#/detail/${restaurant.id}`}" id="buttonOnSearchBarList">${restaurant.name}</a></h3>
          <p>${restaurant.description}</p>
      </div>
    </div>
  </div>
`;

const createElementTemplate = ({ text, element, className }) => `
  <${element} class=${className} tabindex="0">${text}<${element}>
`;

const createRewiewItemTemplate = ({ name, date, review }) => `
<div class="review-item">
  <h5 tabindex="0">
    <i class="fa fa-user"></i> 
    ${name === undefined ? 'anonim' : name} 
    - <span>${date}</span>
  </h5>
  <p class="review-text" tabindex="0">${review === undefined ? ' ' : review}</p>
</div>
`;

const createReviewFormTemplate = () => `
  <h3 tabindex="0">Add Review</h3>
  <form class="form">
    <input type="text" id="name" placeholder="Enter your name" class="input-name__review" required/>
    <textarea id="review-message" placeholder="Add review.." class="input-message__review" required></textarea>
    <button id="send-review-button" aria-label="Send this review" class="send-review-button">
      <i class="fa fa-send" aria-hidden="true"></i>
    </button>
  </form>
`;

const createFavoriteRestaurantButtonTemplate = () => `
  <button aria-label="add to favorite" id="favoriteButton" class="favorite">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnfavoriteRestaurantButtonTemplate = () => `
  <button aria-label="remove from favorite" id="favoriteButton" class="favorite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLoadingSpinnerTemplate = () => `
  <div class="blank"></div>
  <div class="loading-wrapper">
  <div class="loading">
    <div class="loading-1"></div>
    <div class="loading-2"></div>
    <div class="loading-3"></div>
  </div>
  </div>
`;

const createReviewStatusTemplate = ({ error, message }) => `
  <div class="review-status-container">
    <div class="review-status">
      <h2>${error ? 'Error' : 'Success'}</h2>
      <p>${error ? message : 'add review success!!'}</p>
    </div>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createDetailRestaurantTemplate,
  createFavoriteRestaurantButtonTemplate,
  createUnfavoriteRestaurantButtonTemplate,
  createLoadingSpinnerTemplate,
  createRewiewItemTemplate,
  createElementTemplate,
  createReviewFormTemplate,
  createRestaurantSearchItemTemplate,
  createReviewStatusTemplate,
};
