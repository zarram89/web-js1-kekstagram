# План реализации: Генерация временных данных (module4-task1)

## Описание задачи

Необходимо создать функционал для генерации массива из 25 объектов, представляющих фотографии пользователей с комментариями. Эти данные будут использоваться для дальнейшей разработки интерфейса приложения Кекстаграм.

## Требования к данным

### Структура объекта фотографии:
- **id** (число): уникальный идентификатор от 1 до 25
- **url** (строка): адрес вида `photos/{{i}}.jpg`, где i от 1 до 25
- **description** (строка): произвольное описание фотографии
- **likes** (число): случайное от 15 до 200
- **comments** (массив): от 0 до 30 комментариев

### Структура объекта комментария:
- **id** (число): уникальный идентификатор
- **avatar** (строка): путь вида `img/avatar-{{i}}.svg`, где i от 1 до 6
- **message** (строка): одно или два случайных предложения
- **name** (строка): случайное имя автора

## Предлагаемые изменения

### Добавление в `Readme.md`

#### [MODIFY] [Readme.md](file:///d:/antigravity/anti-keksagram/Readme.md)

Добавим техническое задание проекта в свернутом виде (используя HTML тег `<details>`) и описание текущей задачи с планом выполнения.

---

### Подключение скрипта

#### [MODIFY] [index.html](file:///d:/antigravity/anti-keksagram/index.html)

Добавим подключение файла `js/main.js` перед закрывающим тегом `</body>`.

---

### Реализация генерации данных

#### [MODIFY] [main.js](file:///d:/antigravity/anti-keksagram/js/main.js)

Создадим следующие функции:

1. **Вспомогательные функции:**
  - `getRandomInteger(min, max)` - генерация случайного целого числа
  - `getRandomArrayElement(array)` - выбор случайного элемента массива
  - `createIdGenerator()` - фабрика для создания генераторов уникальных ID

2. **Генерация комментариев:**
  - `createComment()` - создание объекта комментария
  - `createComments()` - создание массива случайного количества комментариев

3. **Генерация фотографий:**
  - `createPhoto(index)` - создание объекта фотографии
  - `createPhotos()` - создание массива из 25 фотографий

4. **Константы:**
  - Массивы сообщений для комментариев
  - Массив имен комментаторов
  - Массив описаний фотографий

## План проверки

### Автоматизированная проверка

1. Открыть `index.html` в браузере
2. Открыть консоль разработчика (F12)
3. Проверить, что в консоли выведен массив из 25 объектов
4. Проверить структуру случайного объекта фотографии
5. Проверить уникальность ID фотографий
6. Проверить уникальность URL фотографий
7. Проверить корректность диапазонов значений (likes: 15-200, comments: 0-30)
8. Проверить структуру комментариев

### Ручная проверка

1. Визуально проверить, что каждая фотография имеет:
  - Уникальный ID
  - Корректный URL
  - Непустое описание
  - Количество лайков в диапазоне 15-200
  - От 0 до 30 комментариев

2. Проверить комментарии:
  - Уникальные ID
  - Корректные пути к аватарам (1-6)
  - Сообщения из предложенного набора (1 или 2 предложения)
  - Случайные имена

## Преимущества подхода

1. **Модульность**: каждая функция выполняет одну задачу
2. **Переиспользование**: вспомогательные функции можно использовать в будущем
3. **Читаемость**: код легко понять и поддерживать
4. **Уникальность ID**: использование генераторов гарантирует отсутствие дубликатов

---

# План реализации: Разделение кода на модули (module5-task1)

## Описание задачи

Необходимо разделить код из `main.js` на отдельные ES2015-модули для улучшения структуры проекта, повышения читаемости и поддерживаемости кода.

## Анализ текущего кода

В файле `main.js` находятся:
- Вспомогательные функции (`getRandomInteger`, `getRandomArrayElement`, `createIdGenerator`)
- Константы данных (`MESSAGES`, `NAMES`, `DESCRIPTIONS`)
- Настройки генерации (`PHOTO_COUNT`, диапазоны значений)
- Функции для создания комментариев и фотографий
- Код запуска (генерация данных и вывод в консоль)

## Предлагаемая структура модулей

### 1. util.js — Модуль вспомогательных функций

**Содержимое:**
- `getRandomInteger(min, max)` — генерация случайного целого числа
- `getRandomArrayElement(elements)` — выбор случайного элемента
- `createIdGenerator()` — фабрика генераторов уникальных ID

**Экспорт:** именованный экспорт всех функций

---

### 2. data.js — Модуль генерации данных

**Содержимое:**
- Импорт функций из `util.js`
- Константы: `MESSAGES`, `NAMES`, `DESCRIPTIONS`
- Настройки генерации
- `createComment()` — создание комментария
- `createComments()` — создание массива комментариев
- `createPhoto(index)` — создание фотографии
- `createPhotos()` — создание массива фотографий

**Экспорт:** `createPhotos` как основная функция модуля

---

### 3. main.js — Точка входа

**Содержимое:**
- Импорт `createPhotos` из `data.js`
- Генерация данных
- Вывод в консоль для проверки

---

### 4. Дополнительные модули (заготовки для будущего)

На основе технического задания создадим пустые файлы для будущих модулей:

- **form.js** — работа с формой загрузки изображения
- **scale.js** — изменение масштаба изображения
- **effect.js** — применение эффектов к изображению
- **validation.js** — валидация хэштегов и комментариев
- **upload.js** — загрузка данных на сервер
- **gallery.js** — отображение миниатюр фотографий
- **preview.js** — полноэкранный просмотр фотографии
- **filter.js** — фильтрация изображений
- **api.js** — работа с сервером

## Предлагаемые изменения

### Создание модулей

#### [NEW] [util.js](file:///d:/antigravity/anti-keksagram/js/util.js)

Создание модуля с вспомогательными функциями.

```javascript
export const getRandomInteger = (min, max) => { /* ... */ };
export const getRandomArrayElement = (elements) => { /* ... */ };
export const createIdGenerator = () => { /* ... */ };
```

---

#### [NEW] [data.js](file:///d:/antigravity/anti-keksagram/js/data.js)

Создание модуля для генерации данных.

```javascript
import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';
// ... константы и функции генерации
export const createPhotos = () => { /* ... */ };
```

---

#### [MODIFY] [main.js](file:///d:/antigravity/anti-keksagram/js/main.js)

Преобразование в точку входа с импортами.

```javascript
import { createPhotos } from './data.js';

const photos = createPhotos();
console.log(photos);
```

---

#### [MODIFY] [index.html](file:///d:/antigravity/anti-keksagram/index.html)

Изменение подключения скрипта на модуль.

```html
<script src="js/main.js" type="module"></script>
```

---

#### [NEW] Заготовки модулей

Создание пустых файлов для будущих модулей с комментариями о назначении.

## План проверки

### Проверка работоспособности

1. Открыть `index.html` в браузере
2. Открыть консоль разработчика (F12)
3. Убедиться, что в консоли выводится массив из 25 фотографий
4. Проверить отсутствие ошибок в консоли

### Проверка модульной структуры

1. Убедиться, что код разделен на логические модули
2. Проверить корректность импортов/экспортов
3. Проверить, что каждый модуль имеет четкую ответственность

### Возможные проблемы и решения

**Проблема:** CORS-ошибка при локальном открытии файла
**Решение:** Использовать локальный веб-сервер (например, Live Server в VS Code)

**Проблема:** Браузер не поддерживает ES6-модули
**Решение:** Использовать современный браузер (Chrome, Firefox, Edge)

## Преимущества модульного подхода

1. **Разделение ответственности**: каждый модуль отвечает за свою задачу
2. **Переиспользование**: модули можно легко импортировать в других частях проекта
3. **Тестируемость**: модули легче тестировать изолированно
4. **Масштабируемость**: легко добавлять новые модули
5. **Читаемость**: код структурирован и понятен
6. **Инкапсуляция**: приватные функции остаются внутри модуля

---

# План реализации: Отрисовка миниатюр фотографий (module7-task1)

## Описание задачи

Необходимо создать модуль для отрисовки миниатюр фотографий других пользователей. Модуль должен использовать временные данные и шаблон `#picture` для создания DOM-элементов и отображения их в блоке `.pictures`.

## Анализ шаблона

Шаблон `#picture` в `index.html` (строки 216-224):

```html
<template id="picture">
  <a href="#" class="picture">
    <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments"></span>
      <span class="picture__likes"></span>
    </p>
  </a>
</template>
```

##Требования к заполнению данными

- **src** — адрес изображения из поля `url`
- **alt** — описание изображения из поля `description`
- **picture__likes** — количество лайков из поля `likes`
- **picture__comments** — количество комментариев (длина массива `comments`)

## Предлагаемая структура модуля gallery.js

### Функции модуля

1. **createPictureElement(photo)** — создание DOM-элемента миниатюры
  - Клонирует шаблон `#picture`
  - Заполняет данными из объекта photo
  - Возвращает готовый элемент

2. **renderPictures(photos, container)** — отрисовка всех миниатюр
  - Создает `DocumentFragment`
  - Создает элементы для каждой фотографии
  - Вставляет фрагмент в контейнер за одну операцию

### Экспорт

```javascript
export { renderPictures };
```

## Предлагаемые изменения

### Реализация модуля gallery.js

#### [MODIFY] [gallery.js](file:///d:/antigravity/anti-keksagram/js/gallery.js)

Заменить заготовку полноценной реализацией:

```javascript
// Получение шаблона
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Контейнер для миниатюр
const picturesContainer = document.querySelector('.pictures');

// Создание элемента миниатюры
const createPictureElement = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

// Отрисовка миниатюр
const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createPictureElement(photo));
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
```

---

### Обновление main.js

#### [MODIFY] [main.js](file:///d:/antigravity/anti-keksagram/js/main.js)

Импортировать и вызвать функцию отрисовки:

```javascript
import { createPhotos } from './data.js';
import { renderPictures } from './gallery.js';

const photos = createPhotos();
renderPictures(photos);
```

Примечание: вывод в консоль `console.log(photos)` можно удалить или закомментировать.

---

### Обновление Readme.md

#### [MODIFY] [Readme.md](file:///d:/antigravity/anti-keksagram/Readme.md)

Добавить описание выполненной задачи в свернутом блоке.

## План проверки

### Проверка в браузере

1. Открыть `index.html` в браузере через локальный сервер
2. Убедиться, что на странице отображаются миниатюры фотографий
3. Проверить, что отображается ровно 25 миниатюр

### Проверка данных

1. Проверить, что изображения имеют корректные адреса (`photos/1.jpg` ... `photos/25.jpg`)
2. Проверить, что у каждой миниатюры есть описание в атрибуте `alt`
3. Проверить, что отображается количество лайков (15-200)
4. Проверить, что отображается количество комментариев (0-30)

### Проверка кода

1. Убедиться, что используется `DocumentFragment` для вставки элементов
2. Убедиться, что шаблон клонируется правильно
3. Проверить отсутствие ошибок в консоли

### Возможные проблемы

**Проблема:** Миниатюры не отображаются
**Причина:** Блок `.pictures` скрыт или не существует
**Решение:** Проверить наличие элемента в DOM и его CSS

**Проблема:** Изображения не загружаются
**Причина:** Неправильные пути к изображениям
**Решение:** Убедиться, что папка `photos` существует с файлами 1.jpg-25.jpg

## Преимущества реализации

1. **Производительность**: использование `DocumentFragment` минимизирует reflow
2. **Модульность**: отрисовка отделена от генерации данных
3. **Переиспользование**: функции можно использовать для обновления галереи
4. **Читаемость**: код структурирован и понятен

---

# План реализации: Полноразмерный просмотр фотографий (module8-task1)

## Описание задачи

Реализовать сценарий просмотра фотографий в полноразмерном режиме. При клике на миниатюру должно открываться модальное окно с большим изображением, комментариями и лайками.

## Анализ структуры HTML

Блок `.big-picture` в `index.html` (строки 148-196):

```html
<section class="big-picture overlay hidden">
  <div class="big-picture__preview">
    <div class="big-picture__img">
      <img src="..." alt="..." width="600" height="600">
    </div>
    <div class="big-picture__social social">
      <div class="social__header">
        <!-- Аватар и подпись -->
        <p class="social__caption">...</p>
        <p class="social__likes">Нравится <span class="likes-count">...</span></p>
      </div>
      <!-- Комментарии -->
      <div class="social__comment-count">
        <span class="social__comment-shown-count">...</span> из
        <span class="social__comment-total-count">...</span> комментариев
      </div>
      <ul class="social__comments">...</ul>
      <button class="social__comments-loader comments-loader">...</button>
    </div>
    <button class="big-picture__cancel cancel" id="picture-cancel">Закрыть</button>
  </div>
</section>
```

## Требования к заполнению

- **Изображение**: URL в `.big-picture__img img[src]`
- **Лайки**: количество в `.likes-count`
- **Комментарии (всего)**: в `.social__comment-total-count`
- **Комментарии (показано)**: в `.social__comment-shown-count`
- **Список комментариев**: в `.social__comments`
- **Описание**: в `.social__caption`

Каждый комментарий должен иметь структуру:
```html
<li class="social__comment">
  <img class="social__picture" src="{{аватар}}" alt="{{имя}}" width="35" height="35">
  <p class="social__text">{{текст}}</p>
</li>
```

## Предлагаемая структура модуля preview.js

### Функции модуля

1. **renderComments(comments)** — отрисовка комментариев
  - Очищает список
  - Создает элементы для каждого комментария
  - Вставляет в `.social__comments`

2. **fillBigPicture(photo)** — заполнение данных
  - Устанавливает URL изображения
  - Устанавливает количество лайков
  - Устанавливает описание
  - Вызывает renderComments

3. **closeBigPicture()** — закрытие окна
  - Добавляет класс `hidden` к `.big-picture`
  - Удаляет класс `modal-open` у `body`
  - Удаляет обработчик Esc

4. **onDocumentKeydown(evt)** — обработчик Esc
  - Проверяет клавишу Esc
  - Вызывает closeBigPicture

5. **showBigPicture(photo)** — открытие окна
  - Заполняет данные через fillBigPicture
  - Скрывает блоки счетчика и загрузки
  - Удаляет класс `hidden` у `.big-picture`
  - Добавляет класс `modal-open` к `body`
  - Добавляет обработчик Esc

### Экспорт

```javascript
export { showBigPicture };
```

## Предлагаемые изменения

### Реализация preview.js

####  [MODIFY] [preview.js](file:///d:/antigravity/anti-keksagram/js/preview.js)

Заменить заготовку полноценной реализацией:

```javascript
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
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Обработчик Esc
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

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
```

---

### Обновление gallery.js

#### [MODIFY] [gallery.js](file:///d:/antigravity/anti-keksagram/js/gallery.js)

Добавить импорт и обработчики клика:

```javascript
import { showBigPicture } from './preview.js';

// ... существующий код ...

const createPictureElement = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  // ... существующий код заполнения ...

  // Добавить обработчик клика
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(photo);
  });

  return pictureElement;
};
```

---

### Обновление Readme.md

#### [MODIFY] [Readme.md](file:///d:/antigravity/anti-keksagram/Readme.md)

Добавить описание выполненной задачи в свернутом блоке.

## План проверки

### Проверка открытия

1. Открыть страницу в браузере
2. Кликнуть на любую миниатюру
3. ✅ Окно полноразмерного просмотра открывается
4. ✅ Класс `modal-open` добавлен к `body`

### Проверка данных

1. ✅ Отображается корректное изображение
2. ✅ Отображается количество лайков
3. ✅ Отображается описание фотографии
4. ✅ Отображаются все комментарии
5. ✅ Счетчик показанных комментариев = общему количеству
6. ✅ Блоки счетчика и загрузки скрыты

### Проверка закрытия

1. ✅ Окно закрывается по клику на кнопку
2. ✅ Окно закрывается по нажатию Esc
3. ✅ Класс `modal-open` удаляется из `body`
4. ✅ Обработчик Esc корректно удаляется

### Возможные проблемы

**Проблема:** Окно не открывается
**Причина:** Неправильный селектор или обработчик не добавлен
**Решение:** Проверить селекторы и addEventListener

**Проблема:** Комментарии не отображаются
**Причина:** Неправильная структура HTML или данные
**Решение:** Проверить структуру li элементов

## Преимущества реализации

1. **Модульность**: логика просмотра отделена от галереи
2. **Управление состоянием**: корректное добавление/удаление классов
3. **Оптимизация**: использование DocumentFragment для комментариев
4. **UX**: блокировка прокрутки body при открытом модальном окне
5. **Доступность**: закрытие по Esc для удобства пользователей

---

# План реализации: Постраничная загрузка комментариев (module8-task2)

## Описание задачи

Доработать функционал полноразмерного просмотра, чтобы комментарии показывались не все сразу, а порциями по 5 штук. Пользователь может загрузить следующие 5 комментариев, нажав кнопку "Загрузить ещё".

## Требования

1. Показать блоки `.social__comment-count` и `.comments-loader` (убрать класс `hidden`)
2. При открытии показывать только первые 5 комментариев
3. По клику на кнопку "Загрузить ещё" показывать следующие 5 комментариев
4. Обновлять счетчик показанных комментариев `.social__comment-shown-count`
5. Скрывать кнопку когда все комментарии показаны

## Текущая реализация

Сейчас в `preview.js`:
- Функция `renderComments(comments)` показывает все комментарии сразу
- Блоки счетчика и загрузчика скрываются при открытии окна

## Предлагаемые изменения

### Обновление preview.js

#### Новые переменные состояния

```javascript
const COMMENTS_PER_PORTION = 5; // Количество комментариев в одной порции
let currentComments = []; // Текущий массив комментариев
let shownCommentsCount = 0; // Количество показанных комментариев
```

#### Обновление функции renderComments

```javascript
const renderComments = (count) => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  // Показываем комментарии от 0 до count
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
```

#### Новая функция updateCommentsCount

```javascript
const updateCommentsCount = () => {
  commentsShownCount.textContent = shownCommentsCount;
  commentsCount.textContent = currentComments.length;

  // Скрыть кнопку если все показаны
  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};
```

#### Новая функция loadMoreComments

```javascript
const loadMoreComments = () => {
  shownCommentsCount = Math.min(
    shownCommentsCount + COMMENTS_PER_PORTION,
    currentComments.length
  );
  renderComments(shownCommentsCount);
  updateCommentsCount();
};
```

#### Обновление функции fillBigPicture

```javascript
const fillBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  // Сохранить комментарии
  currentComments = comments;

  // Показать первые 5 комментариев
  shownCommentsCount = Math.min(COMMENTS_PER_PORTION, comments.length);
  renderComments(shownCommentsCount);
  updateCommentsCount();
};
```

#### Обновление функции showBigPicture

```javascript
const showBigPicture = (photo) => {
  fillBigPicture(photo);

  // Показать блоки счетчика и загрузки (убрать hidden)
  commentCount.classList.remove('hidden');
  // commentsLoader будет показан/скрыт в updateCommentsCount

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
```

#### Добавление обработчика на кнопку

```javascript
commentsLoader.addEventListener('click', loadMoreComments);
```

## Полный обновленный код preview.js

```javascript
// Константы
const COMMENTS_PER_PORTION = 5;

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

// Заполнение данных
const fillBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  currentComments = comments;
  shownCommentsCount = Math.min(COMMENTS_PER_PORTION, comments.length);
  renderComments(shownCommentsCount);
  updateCommentsCount();
};

// Обработчик кнопки загрузки
commentsLoader.addEventListener('click', loadMoreComments);
```

## План проверки

### Тест 1: Фото с более чем 5 комментариями

1. Открыть фото с >5 комментариями
2. ✅ Показаны первые 5 комментариев
3. ✅ Счетчик показывает "5 из X"
4. ✅ Кнопка "Загрузить ещё" видна
5. Кликнуть на кнопку
6. ✅ Показано 10 комментариев (или меньше если всего <10)
7. ✅ Счетчик обновлен

### Тест 2: Фото с менее чем 5 комментариями

1. Открыть фото с ≤5 комментариями
2. ✅ Показаны все комментарии
3. ✅ Счетчик показывает "X из X"
4. ✅ Кнопка "Загрузить ещё" скрыта

### Тест 3: Фото с ровно 5 комментариями

1. Открыть фото с 5 комментариями
2. ✅ Показаны все 5
3. ✅ Счетчик "5 из 5"
4. ✅ Кнопка скрыта

### Тест 4: Загрузка всех комментариев

1. Открыть фото с 12 комментариями
2. ✅ Показано 5, кнопка видна
3. Кликнуть "Загрузить ещё"
4. ✅ Показано 10, кнопка видна
5. Кликнуть еще раз
6. ✅ Показано 12, кнопка скрыта

## Преимущества реализации

1. **UX**: не перегружаем интерфейс большим количеством комментариев
2. **Производительность**: меньше DOM-элементов при первой отрисовке
3. **Простота**: комментарии не загружаются с сервера, просто показываются из массива
4. **Гибкость**: легко изменить размер порции (константа COMMENTS_PER_PORTION)

---

# План реализации: Валидация формы загрузки изображения (module9-task1)

## Описание задачи

Добавить валидацию формы загрузки изображения с использованием библиотеки Pristine. Реализовать открытие/закрытие формы и валидацию хэштегов и комментариев согласно техническому заданию.

## Требования из ТЗ

### Хэштеги (пункт 2.3)
- Начинаются с символа `#`
- После решётки — только буквы и цифры
- Не может быть только `#`
- Максимальная длина — 20 символов (включая `#`)
- Регистронезависимая уникальность
- Разделяются пробелами
- Максимум 5 хэштегов
- Необязательное поле
- При фокусе в поле Esc не закрывает форму

### Комментарий (пункт 2.4)
- Необязательное поле
- Максимум 140 символов
- При фокусе в поле Esc не закрывает форму

### Форма (пункт 1.2)
- Открывается при выборе файла
- Показывается `.img-upload__overlay` (убрать класс `hidden`)
- `body` добавляется класс `modal-open`
- Закрывается по кнопке `.img-upload__cancel` или Esc
- При закрытии сбрасываются все поля

## Предложенные изменения

### 1. index.html

#### [MODIFY] [index.html](file:///d:/antigravity/anti-keksagram/index.html)

**Добавить атрибуты формы:**
```html
<form
  class="img-upload__form"
  id="upload-select-image"
  method="POST"
  enctype="multipart/form-data"
  action="https://32.javascript.htmlacademy.pro/kekstagram"
  autocomplete="off">
```

**Подключить библиотеку Pristine:**
```html
<script src="vendor/pristine/pristine.min.js"></script>
<script src="js/main.js" type="module"></script>
```

---

### 2. js/form.js

#### [MODIFY] [form.js](file:///d:/antigravity/anti-keksagram/js/form.js)

Модуль управления формой загрузки изображения.

**Элементы DOM:**
```javascript
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const body = document.querySelector('body');
```

**Функция открытия формы:**
```javascript
function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}
```

**Функция закрытия формы:**
```javascript
function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  // Сброс формы
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
}
```

**Обработчик Esc с проверкой фокуса:**
```javascript
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;
    const isTextFieldFocused =
      activeElement === hashtagsInput ||
      activeElement === descriptionInput;

    if (!isTextFieldFocused) {
      closeUploadForm();
    }
  }
}
```

**Инициализация:**
```javascript
uploadInput.addEventListener('change', openUploadForm);
uploadCancel.addEventListener('click', closeUploadForm);
```

---

### 3. js/validation.js

#### [MODIFY] [validation.js](file:///d:/antigravity/anti-keksagram/js/validation.js)

Модуль валидации с библиотекой Pristine.

**Константы:**
```javascript
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
```

**Инициализация Pristine:**
```javascript
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
```

**Вспомогательные функции:**
```javascript
const parseHashtags = (value) => {
  if (!value.trim()) return [];
  return value.trim().split(/\s+/);
};
```

**Валидаторы хэштегов:**

1. **Формат хэштега:**
```javascript
const validateHashtagFormat = (value) => {
  const hashtags = parseHashtags(value);
  if (hashtags.length === 0) return true;
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};
```

2. **Количество хэштегов:**
```javascript
const validateHashtagCount = (value) => {
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
};
```

3. **Уникальность хэштегов:**
```javascript
const validateHashtagUniqueness = (value) => {
  const hashtags = parseHashtags(value);
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return uniqueHashtags.size === hashtags.length;
};
```

**Валидатор комментария:**
```javascript
const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;
```

**Добавление валидаторов:**
```javascript
pristine.addValidator(hashtagsInput, validateHashtagFormat, 'Неправильный хэштег');
pristine.addValidator(hashtagsInput, validateHashtagCount, 'Превышено количество хэштегов');
pristine.addValidator(hashtagsInput, validateHashtagUniqueness, 'Хэштеги повторяются');
pristine.addValidator(descriptionTextarea, validateCommentLength, 'Длина комментария больше 140 символов');
```

**Обработка отправки формы:**
```javascript
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    // TODO: отправка на сервер
  }
});
```

---

### 4. js/main.js

#### [MODIFY] [main.js](file:///d:/antigravity/anti-keksagram/js/main.js)

Импортировать новые модули:

```javascript
import './form.js';
import './validation.js';
```

---

## План проверки

### Автоматизированное тестирование

| Тест | Входные данные | Ожидаемый результат |
|------|----------------|---------------------|
| Pristine загружена | - | `typeof Pristine === 'function'` |
| Невалидный хэштег | `invalid` | Ошибка "Неправильный хэштег" |
| Валидные хэштеги | `#test #hello` | Валидация пройдена |
| Дубликаты | `#test #TEST #Test` | Ошибка "Хэштеги повторяются" |
| Превышение лимита | `#one #two #three #four #five #six` | Ошибка "Превышено количество хэштегов" |
| Длинный хэштег | `#verylonghashtagmorethan20characters` | Ошибка "Неправильный хэштег" |
| Длинный комментарий | 150 символов | Ошибка "Длина комментария больше 140 символов" |
| Пустые поля | Пустые хэштеги и комментарий | Валидация пройдена |

### Ручное тестирование

| Тест | Действия | Ожидаемый результат |
|------|---------|---------------------|
| Открытие формы | Выбор файла | Форма открылась |
| Закрытие по кнопке | Клик на × | Форма закрылась |
| Закрытие по Esc | Esc (фокус вне полей) | Форма закрылась |
| Esc в хэштегах | Фокус в хэштегах → Esc | Форма НЕ закрылась |
| Esc в комментарии | Фокус в комментарии → Esc | Форма НЕ закрылась |
| Сброс полей | Ввод → закрытие → открытие | Поля пустые |

---

## Критерии приёмки

- ✅ Форма имеет корректные атрибуты `method`, `enctype`, `action`
- ✅ Форма открывается при выборе файла
- ✅ Форма закрывается по кнопке и Esc
- ✅ Esc не закрывает форму при фокусе в текстовых полях
- ✅ Все хэштег-правила валидируются корректно
- ✅ Комментарий валидируется корректно
- ✅ Форма не отправляется при невалидных данных
- ✅ Поля сбрасываются при закрытии формы
- ✅ Код соответствует ESLint

---

# План реализации: Редактирование масштаба и применение эффектов (module9-task2)

## Описание задачи

Реализовать функционал редактирования изображения:
1. **Масштабирование** - изменение размера изображения с шагом 25% (от 25% до 100%)
2. **Эффекты** - применение фильтров с помощью noUiSlider (Хром, Сепия, Марвин, Фобос, Зной, Оригинал)

## Требования из ТЗ

### Масштаб (пункт 2.1)
- Кнопки `.scale__control--smaller` и `.scale__control--bigger` изменяют значение `.scale__control--value`
- Шаг изменения: 25%
- Диапазон: 25% - 100%
- Значение по умолчанию: 100%
- При изменении значения к изображению `.img-upload__preview img` применяется `transform: scale(X)`

### Эффекты (пункт 2.2)
- По умолчанию выбран эффект "Оригинал"
- Одновременно может быть применен только один эффект
- Интенсивность регулируется слайдером noUiSlider
- Уровень записывается в поле `.effect-level__value`
- При выборе "Оригинал" - слайдер скрывается
- При переключении эффектов - уровень сбрасывается до 100%

## Предложенные изменения

### 1. index.html

#### [MODIFY] [index.html](file:///d:/antigravity/anti-keksagram/index.html)

**Подключить библиотеку noUiSlider:**
```html
<link rel="stylesheet" href="vendor/nouislider/nouislider.css">
<script src="vendor/nouislider/nouislider.js"></script>
```

---

### 2. js/scale.js

Реализовать управление масштабом изображения с кнопками и сброс при закрытии формы.

---

### 3. js/effect.js

Реализовать применение 6 эффектов с noUiSlider и автоматический сброс при переключении.

---

### 4. js/form.js

Добавить вызовы `resetScale()` и `resetEffect()` при закрытии формы.

---

### 5. js/main.js

Импортировать модули `scale.js` и `effect.js`.

---

## План проверки

### Масштаб
- Кнопки "-" и "+" работают с шагом 25%
- Ограничения 25%-100% соблюдаются
- CSS `transform: scale()` применяется корректно
- Сброс до 100% при закрытии формы

### Эффекты
- Все 6 эффектов применяются корректно
- Слайдер работает и обновляет фильтр
- Слайдер скрывается для "Оригинал"
- Уровень сбрасывается до 100% при переключении
- Сброс до "Оригинал" при закрытии формы
