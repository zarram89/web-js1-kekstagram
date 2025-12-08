import { renderPictures } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import { initFilters } from './filter.js';
import { debounce } from './util.js';
import './form.js';
import './validation.js';
import './scale.js';
import './effect.js';

getData()
  .then((pictures) => {
    const debouncedRenderPictures = debounce(renderPictures);
    renderPictures(pictures);
    initFilters(pictures, debouncedRenderPictures);
  })
  .catch(() => {
    showAlert();
  });
