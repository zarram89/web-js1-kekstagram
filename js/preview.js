// Модуль для отображения фотографии в полноразмерном режиме

// Элементы DOM
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

// Отрисовка комментариев
const renderComments = (comments) => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>
    `;
    fragment.appendChild(comment);
  });

  socialComments.appendChild(fragment);
};

// Заполнение данных большого изображения
const fillBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  commentsShownCount.textContent = comments.length;
  socialCaption.textContent = description;
  renderComments(comments);
};

// Закрытие окна
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Обработчик Esc
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

// Открытие окна
const showBigPicture = (photo) => {
  fillBigPicture(photo);

  // Скрыть блоки счетчика и загрузки
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Показать окно
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Обработчики закрытия
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик клика на кнопку закрытия
bigPictureCancel.addEventListener('click', closeBigPicture);

export { showBigPicture };
