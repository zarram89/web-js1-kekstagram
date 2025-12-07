// Модуль для работы с формой загрузки изображения

// Получение элементов DOM
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const body = document.querySelector('body');

// Функция закрытия формы
function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  // Сброс формы
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
}

// Обработчик нажатия Esc
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    // Проверяем, не в текстовом ли поле сейчас фокус
    const activeElement = document.activeElement;
    const isTextFieldFocused =
      activeElement === hashtagsInput ||
      activeElement === descriptionInput;

    if (!isTextFieldFocused) {
      closeUploadForm();
    }
  }
}

// Функция открытия формы
function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

// Инициализация обработчиков
uploadInput.addEventListener('change', openUploadForm);
uploadCancel.addEventListener('click', closeUploadForm);
