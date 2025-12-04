// Модуль для отображения галереи миниатюр фотографий

// Получение шаблона
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Контейнер для миниатюр
const picturesContainer = document.querySelector('.pictures');

// Создание элемента миниатюры из шаблона
const createPictureElement = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

// Отрисовка всех миниатюр
const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createPictureElement(photo));
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
