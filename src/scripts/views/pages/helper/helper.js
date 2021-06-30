/* eslint-disable no-param-reassign */
const HelperRenderPage = {
  init({ container, data, template }) {
    data.forEach((element) => {
      container.innerHTML += template(element);
    });
  },
};

export default HelperRenderPage;
