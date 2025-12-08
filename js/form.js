// Модуль для работы с формой загрузки изображения
import { resetScale } from './scale.js';
import { resetEffect } from './effect.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Получение элементов DOM
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const body = document.querySelector('body');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

// Функция закрытия формы
function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  // Сброс формы
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';

  // Сброс масштаба и эффекта
  resetScale();
  resetEffect();
}

// Обработчик нажатия Esc
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    // Если открыто сообщение об ошибке, Esc не должен закрывать форму
    const isErrorDetailsOpen = document.querySelector('.error');

    if (isErrorDetailsOpen) {
      return;
    }

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

  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effect) => {
      effect.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
}

// Инициализация обработчиков
uploadInput.addEventListener('change', openUploadForm);
uploadCancel.addEventListener('click', closeUploadForm);

export { closeUploadForm };
