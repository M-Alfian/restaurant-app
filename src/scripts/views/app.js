import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import SearchBarPresenter from '../utils/search-bar-presenter';

class App {
  constructor({
    button,
    drawer,
    content,
    openSearchButton,
    closeSearchButton,
    searchButton,
    searchDrawer,
    searchContent,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._openSearchButton = openSearchButton;
    this._closeSearchButton = closeSearchButton;
    this._searchButton = searchButton;
    this._searchDrawer = searchDrawer;
    this._searchContent = searchContent;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    SearchBarPresenter.init({
      searchInput: document.querySelector('#searchForm'),
      openSearchButton: this._openSearchButton,
      closeSearchButton: this._closeSearchButton,
      searchButton: this._searchButton,
      content: this._searchContent,
      drawer: this._searchDrawer,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
