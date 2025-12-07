import { createPhotos } from './data.js';
import { renderPictures } from './gallery.js';
import './form.js';
import './validation.js';

// Генерация данных
const photos = createPhotos();

// Отрисовка миниатюр
renderPictures(photos);
