// Модуль для применения эффектов к изображению с библиотекой noUiSlider

// Эффекты и их параметры
const EFFECTS = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

// Элементы DOM
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsRadios = document.querySelectorAll('.effects__radio');

// Текущий эффект
let currentEffect = 'none';

// Инициализация noUiSlider
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number(value.toFixed(0)),
    from: (value) => Number(value),
  },
});

// Функция применения эффекта
const applyEffect = (effectName, level) => {
  const effect = EFFECTS[effectName];

  if (effect.filter === 'none') {
    previewImage.style.filter = '';
    effectLevelContainer.classList.add('hidden');
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  // Преобразование уровня (0-100) в значение эффекта
  const value = effect.min + (level / 100) * (effect.max - effect.min);
  previewImage.style.filter = `${effect.filter}(${value}${effect.unit})`;
  effectLevelValue.value = level;
};

// Обработчик изменения слайдера
effectLevelSlider.noUiSlider.on('update', () => {
  const level = effectLevelSlider.noUiSlider.get();
  applyEffect(currentEffect, level);
});

// Обработчики переключения эффектов
effectsRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    currentEffect = radio.value;

    // Сбросить слайдер на 100%
    effectLevelSlider.noUiSlider.set(100);

    // Применить эффект
    applyEffect(currentEffect, 100);
  });
});

// Функция сброса эффекта
const resetEffect = () => {
  currentEffect = 'none';
  document.querySelector('#effect-none').checked = true;
  previewImage.style.filter = '';
  effectLevelContainer.classList.add('hidden');
  effectLevelSlider.noUiSlider.set(100);
};

// Скрыть слайдер при загрузке (по умолчанию "Оригинал")
effectLevelContainer.classList.add('hidden');

export { resetEffect };
