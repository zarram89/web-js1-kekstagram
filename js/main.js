import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import { initFilters, getFilteredPictures } from './filter.js';
import { debounce } from './util.js';
import './form.js';

getData()
  .then((pictures) => {
    const debouncedRenderGallery = debounce(renderGallery);
    initFilters(pictures, debouncedRenderGallery);
    renderGallery(getFilteredPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  });


// const bootstrap = async () => {
//   try {
//     const photos = await getData();
//     renderThumbnails(photos);
//   } catch(err) {
//     showAlert(err.message);
//   }
// };

// bootstrap();
