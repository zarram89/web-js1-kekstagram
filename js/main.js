import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import './form.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });
