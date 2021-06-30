import RestaurantDbSource from '../../src/scripts/data/restaurantdb-sources';
import SearchBarPresenter from '../../src/scripts/utils/search-bar-presenter';

describe('search bar restaurant', () => {
  const setSearchBarContainer = () => {
    document.body.innerHTML = `
      <button id="searchIconButton"></button>
      <div id="searchDrawer">
        <div>
          <button id="closeButton"><i class="fa fa-close fa-lg"></i></button>
          <input type="text" id="searchForm">
          <button id="searchButton"><i class="fa fa-search fa-lg"></i></button>
        </div>
        <div id="searchContent" class="main-search">
        </div>
      </div>
      <div id="loading"></div>
    `;
  };

  const testSearch = async (value) => {
    document.querySelector('#searchForm').value = value;
    document.querySelector('#searchButton').dispatchEvent(new Event('click'));
    await RestaurantDbSource.searchRestaurant(value);
    const restaurantListItemList = document.querySelectorAll('.restaurant-item');
    return restaurantListItemList.length;
  };

  beforeEach(async () => {
    setSearchBarContainer();
    await SearchBarPresenter.init({
      openSearchButton: document.querySelector('#searchIconButton'),
      closeSearchButton: document.querySelector('#closeButton'),
      searchButton: document.querySelector('#searchButton'),
      content: document.querySelector('#searchContent'),
      drawer: document.querySelector('#searchDrawer'),
      searchInput: document.querySelector('#searchForm'),
    });
  });

  it('should be able to open and close search bar', async () => {
    document.querySelector('#searchIconButton').dispatchEvent(new Event('click'));
    expect(document.querySelector('.s-opened')).toBeTruthy();

    document.querySelector('#closeButton').dispatchEvent(new Event('click'));
    expect(document.querySelector('.s-opened')).toBeFalsy();
  });

  it('should be able to search restaurant and display it', async () => {
    const queryTest = 'Kafein';
    expect(await testSearch(queryTest)).toEqual(1);
    const listButton = document.querySelectorAll('#buttonOnSearchBarList');
    expect(listButton.length).toEqual(1);
    expect(listButton[0].innerHTML).toEqual(queryTest);
  });

  it('should render all restaurants if query is empty', async () => {
    expect(await testSearch('')).toEqual(20);
    expect(await testSearch(' ')).toEqual(20);
    expect(await testSearch('\t')).toEqual(20);
  });
});
