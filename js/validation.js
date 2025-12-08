// Модуль для валидации хэштегов и комментариев с использованием Pristine
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { closeUploadForm } from './form.js';

// Элементы DOM
const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextarea = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

// Константы для валидации
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

// Инициализация Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Вспомогательная функция разбора хэштегов
const parseHashtags = (value) => {
  if (!value.trim()) {
    return [];
  }
  return value.trim().split(/\s+/);
};

// Валидатор формата хэштегов
const validateHashtagFormat = (value) => {
  const hashtags = parseHashtags(value);
  if (hashtags.length === 0) {
    return true; // Хэштеги необязательны
  }
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

// Валидатор количества хэштегов
const validateHashtagCount = (value) => {
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
};

// Валидатор уникальности хэштегов
const validateHashtagUniqueness = (value) => {
  const hashtags = parseHashtags(value);
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return uniqueHashtags.size === hashtags.length;
};

// Валидатор длины комментария
const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

// Добавление валидаторов для хэштегов
pristine.addValidator(
  hashtagsInput,
  validateHashtagFormat,
  'Неправильный хэштег'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagCount,
  'Превышено количество хэштегов'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagUniqueness,
  'Хэштеги повторяются'
);

// Добавление валидатора для комментария
pristine.addValidator(
  descriptionTextarea,
  validateCommentLength,
  'Длина комментария больше 140 символов'
);

// Блокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

// Разблокировка кнопки отправки
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Обработка отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
});
