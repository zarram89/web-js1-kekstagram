import { renderPictures } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import './form.js';
import './validation.js';
import './scale.js';
import './effect.js';

getData()
  .then((pictures) => {
    renderPictures(pictures);
  })
  .catch(() => {
    showAlert();
  });
