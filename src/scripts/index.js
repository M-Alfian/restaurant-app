import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/search.css';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
  openSearchButton: document.querySelector('#searchIconButton'),
  closeSearchButton: document.querySelector('#closeButton'),
  searchButton: document.querySelector('#searchButton'),
  searchDrawer: document.querySelector('#searchDrawer'),
  searchContent: document.querySelector('#mainSearchContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
