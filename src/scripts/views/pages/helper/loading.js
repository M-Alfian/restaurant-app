import { createLoadingSpinnerTemplate } from '../../templates/template-creator';

const Loading = {
  async _showLoadingIndicator(isLoading) {
    const indicatorContainer = document.querySelector('#loading');
    if (await isLoading) {
      indicatorContainer.innerHTML = createLoadingSpinnerTemplate();
    } else {
      indicatorContainer.innerHTML = null;
    }
  },
};

export default Loading;
