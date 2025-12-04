import { createPhotos } from './data.js';
import { renderPictures } from './gallery.js';

// Генерация данных
const photos = createPhotos();

// Отрисовка миниатюр
renderPictures(photos);
