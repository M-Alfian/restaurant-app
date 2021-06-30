import RestaurantDbSource from '../data/restaurantdb-sources';
import { createElementTemplate, createRestaurantSearchItemTemplate } from '../views/templates/template-creator';

const SearchBarPresenter = {
  async init({
    searchInput,
    openSearchButton,
    closeSearchButton,
    searchButton,
    content,
    drawer,
  }) {
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') this._render();
    });

    searchButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._render();
    });

    openSearchButton.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') this._toggleBar(event, drawer);
    });

    openSearchButton.addEventListener('click', (event) => {
      this._toggleBar(event, drawer);
    });

    this._eventClickHandlerClose(closeSearchButton);
    this._eventKeypressHandlerClose(closeSearchButton);
    this._content = content;
    this._drawer = drawer;
  },

  _requestApiHandler() {
    const searchQuery = document.querySelector('#searchForm');
    return RestaurantDbSource.searchRestaurant(searchQuery.value);
  },

  async _render() {
    const dataFromApi = await this._requestApiHandler();
    if (dataFromApi.founded === 0) {
      this._renderWarnIsNotFound();
    } else {
      this._renderWarnIsFound();
      this._renderItems(dataFromApi);
    }
  },

  _renderItems(dataFromApi) {
    dataFromApi.restaurants.forEach((restaurant) => {
      this._content.innerHTML += createRestaurantSearchItemTemplate(restaurant);
      this._buttonsToDetailhandler();
    });
  },

  _buttonsToDetailhandler() {
    const buttonsOnSearchBarList = document.querySelectorAll('#buttonOnSearchBarList');
    buttonsOnSearchBarList.forEach((buttonList) => {
      this._eventClickHandlerClose(buttonList);
      this._eventKeypressHandlerClose(buttonList);
    });
  },

  _eventKeypressHandlerClose(element) {
    element.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this._closeBar(event, this._drawer);
        this._clearBar();
      }
    });
  },

  _eventClickHandlerClose(element) {
    element.addEventListener('click', (event) => {
      this._closeBar(event, this._drawer);
      this._clearBar();
    });
  },

  _renderWarnIsNotFound() {
    this._content.innerHTML = createElementTemplate({
      text: 'Keyword is not found!',
      element: 'h3',
      className: 'search-title',
    });
  },

  _renderWarnIsFound() {
    this._content.innerHTML = createElementTemplate({
      text: 'Search Result :',
      element: 'h3',
      className: 'search-title',
    });
  },

  _toggleBar(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('s-closed');
    drawer.classList.add('s-opened');
  },

  _closeBar(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('s-opened');
  },

  _clearBar() {
    document.querySelector('#searchForm').value = '';
    this._content.innerHTML = '';
  },
};

export default SearchBarPresenter;
