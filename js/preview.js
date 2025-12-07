// Модуль для отображения фотографии в полноразмерном режиме

// Константы
const COMMENTS_PER_PORTION = 5;

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

// Переменные состояния
let currentComments = [];
let shownCommentsCount = 0;

// Отрисовка комментариев
const renderComments = (count) => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const commentsToShow = currentComments.slice(0, count);

  commentsToShow.forEach(({ avatar, name, message }) => {
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

// Обновление счетчиков комментариев
const updateCommentsCount = () => {
  commentsShownCount.textContent = shownCommentsCount;
  commentsCount.textContent = currentComments.length;

  // Скрыть кнопку если все комментарии показаны
  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// Загрузка следующей порции комментариев
const loadMoreComments = () => {
  shownCommentsCount = Math.min(
    shownCommentsCount + COMMENTS_PER_PORTION,
    currentComments.length
  );
  renderComments(shownCommentsCount);
  updateCommentsCount();
};

// Заполнение данных большого изображения
const fillBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  // Сохранить комментарии и показать первые 5
  currentComments = comments;
  shownCommentsCount = Math.min(COMMENTS_PER_PORTION, comments.length);
  renderComments(shownCommentsCount);
  updateCommentsCount();
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

  // Показать блоки счетчика (загрузчик показывается/скрывается в updateCommentsCount)
  commentCount.classList.remove('hidden');

  // Показать окно
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Обработчики закрытия
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик клика на кнопку закрытия
bigPictureCancel.addEventListener('click', closeBigPicture);

// Обработчик клика на кнопку "Загрузить ещё"
commentsLoader.addEventListener('click', loadMoreComments);

export { showBigPicture };
