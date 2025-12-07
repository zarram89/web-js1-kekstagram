// Модуль для изменения масштаба изображения

// Константы
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

// Элементы DOM
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

// Текущее значение масштаба
let currentScale = DEFAULT_SCALE;

// Функция обновления масштаба
const updateScale = (value) => {
  scaleValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
  currentScale = value;
};

// Обработчик уменьшения масштаба
smallerButton.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    updateScale(currentScale - SCALE_STEP);
  }
});

// Обработчик увеличения масштаба
biggerButton.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    updateScale(currentScale + SCALE_STEP);
  }
});

// Функция сброса масштаба
const resetScale = () => {
  updateScale(DEFAULT_SCALE);
};

export { resetScale };
