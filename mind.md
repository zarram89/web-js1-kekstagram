# Ход мыслей разработчика

В этом файле описан процесс размышления при решении задач. Это образовательный материал, показывающий, как анализировать требования и превращать их в код.


<details>
<summary>module4-task1: Временная генерация данных (Mock Data)</summary>

### 1. Анализ задачи
Сервер еще не готов, но мне нужно верстать интерфейс и проверять, как он выглядит с данными (фото, лайки, комментарии).
Решение: написать генератор случайных данных (моков).

**Сущности:**
-   Фотография: id, url (`photos/{{i}}.jpg`), description, likes, comments.
-   Комментарий: id, avatar, message, name.

### 2. Реализация
Мне нужны "кубики" (вспомогательные функции), чтобы строить данные.
1.  `getRandomInteger(min, max)` — база.
2.  `createPhoto()` — собирает объект фото.
3.  `createComment()` — собирает комментарий из случайных фраз.

```javascript
// js/main.js (на этом этапе)

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: 'Описание...',
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
});

const photos = Array.from({ length: 25 }, (_, i) => createPhoto(i + 1));
```
Теперь у меня есть массив `photos`, с которым можно работать, как будто он пришел с сервера.

</details>

<details>
<summary>module5-task1: Структурирование проекта (ES Modules)</summary>

### 1. Анализ задачи
Код в одном файле `main.js` стал слишком большим. Нужно разбить его на части по смыслу.
В современном JS используется модульная система `import/export`.

### 2. План разделения
-   `util.js`: Вспомогательные функции (`getRandomInteger`).
-   `data.js`: Генерация данных (то, что я написал в module4).
-   `main.js`: Точка входа (оркестратор).

### 3. Реализация
В `index.html` обязательно добавляем `type="module"`! Без этого `import` не сработает.

```html
<script src="js/main.js" type="module"></script>
```

В файлах использую `export`, чтобы разрешить другим модулям использовать функции.
```javascript
// js/util.js
export { getRandomInteger };
```
Теперь код стал чище, и я могу искать нужную функцию в соответствующем файле, а не листать простыню кода.

</details>

<details>
<summary>module7-task1: Отрисовка миниатюр</summary>

### 1. Анализ задачи
Данные есть (массив объектов), теперь их надо показать на странице.
В `index.html` есть шаблон `#picture`. Нужно его клонировать 25 раз, заполнить данными и вставить в контейнер `.pictures`.

### 2. Инструменты
`document.querySelector`, `cloneNode(true)`, `textContent`, `src`.
Важно: вставка элемента в DOM — дорогая операция. Если вставлять 25 раз по одному, браузер может тормозить перерисовывая страницу.
Решение: `DocumentFragment`. Это "виртуальная коробка", в которую я сложу все 25 фото, а потом вставлю коробку в DOM за один раз.

### 3. Реализация (gallery.js)
```javascript
// js/gallery.js
const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(photo => {
    const element = template.cloneNode(true);
    element.querySelector('img').src = photo.url;
    // ... заполняем остальное
    fragment.append(element);
  });

  container.append(fragment); // Одна вставка в DOM
};
```

</details>

<details>
<summary>module8-task1: Полноразмерный просмотр (Big Picture)</summary>

### 1. Анализ задачи
При клике на миниатюру должно открываться большое окно (`.big-picture`) с деталями и первым набором комментариев.

**Сложности:**
1.  Как связать клик по маленькой картинке с данными конкретного фото?
  *   *Решение:* Использовать замыкание или индекс. Проще всего передавать объект `photo` прямо в обработчик клика при создании миниатюры.
2.  Открытие/Закрытие окна (Modal).
  *   При открытии: добавить класс `modal-open` на `body` (чтобы фон не скроллился).
  *   При закрытии (кнопка или Esc): убрать класс, очистить обработчики.

### 2. Реализация (preview.js)
Создам модуль `preview.js`, который отвечает за "Большую Картинку".
Функция `showBigPicture(photo)` делает все: заполняет src, лайки, описание и показывает окно.

Важный момент с `Esc`: Обработчик нажатия на кнопку (keydown) нужно добавлять при открытии окна и **обязательно** удалять при закрытии. Иначе они накопятся, и одно нажатие вызовет 10 функций.

</details>

<details>
<summary>module8-task2: Подгрузка комментариев</summary>

### 1. Анализ задачи
Комментариев может быть много (100+). Нельзя показывать все сразу.
Требование: показывать по 5 штук. Кнопка "Загрузить еще" должна подгружать следующие 5.

### 2. Логика
Нужен счетчик `shownComments`.
При открытии: `shownComments = 0`. Берем `slice(0, 5)`.
При клике на кнопку: увеличиваем счетчик `shownComments += 5`. Берем `slice` следующей порции.
Если показаны все комментарии — прячем кнопку "Загрузить еще".

### 3. Реализация
Я перенесу логику отрисовки списка комментариев в отдельную функцию `renderCommentsList`. Она будет знать, сколько уже показано и сколько всего. И будет обновлять текст "5 из 100 комментариев".

</details>

<details>
<summary>module9-task1: Валидация формы загрузки</summary>

### 1. Анализ задачи
Работа с формой загрузки (`.img-upload__overlay`).
Валидация хэштегов сложная:
-   Начинается с #
-   Только буквы/цифры
-   Максимум 20 символов
-   Не повторяются
-   Максимум 5 штук

Нельзя писать валидацию "лапшой" (if...else if...else). Сложно поддерживать.
Решение: использовать библиотеку **Pristine**. Она делает валидацию декларативной и красивой.

### 2. Реализация (validation.js)
Я создаю отдельные функции-валидаторы:
-   `hasUniqueTags`
-   `hasValidCount`
-   `hasValidContent`
    И подключаю их в Pristine:
    `pristine.addValidator(input, hasUniqueTags, 'Хэштеги повторяются')`.

Также нужно обработать `Esc`: если фокус в поле ввода хэштегов, форма закрываться НЕ должна (`evt.stopPropagation()` или проверка `document.activeElement`).

</details>

<details>
<summary>module9-task2: Масштаб и Эффекты</summary>

### 1. Анализ задачи
Две фичи для редактора фото:
1.  **Масштаб:** Кнопки +/-. Меняют `transform: scale(...)` у картинки. Шаг 25%.
2.  **Эффекты:** CSS фильтры (sepia, chrome, blur...). Интенсивность регулируется слайдером.

### 2. Инструменты
Для слайдера используем **noUiSlider**. Стандартный `<input type="range">` сложно стилизовать, а библиотека дает кроссбраузерный слайдер с API.

### 3. Реализация
-   **scale.js:** Простой модуль. Слушает клики, меняет значение в инпуте и стиль картинки.
-   **effect.js:** Сложнее. Нужно мапить (сопоставлять) название эффекта (chrome) и CSS фильтр (`grayscale(value)`).
  *   Создам объект-словарь `EFFECTS`.
  *   При смене радио-кнопки (эффекта) обновляю параметры слайдера (min, max, step) под конкретный эффект. Например, для `blur` диапазон 0..3px, а для `brightness` 1..3.

</details>


### 1. Анализ задачи
Так, передо мной стоит задача "оживить" проект. Сейчас все данные (фотографии, комментарии) генерируются случайно на клиенте. Нужно заменить это на загрузку с реального сервера.

**Что нужно сделать:**
1.  **Получить данные (GET):** Загрузить список фото с `https://32.javascript.htmlacademy.pro/kekstagram/data`.
2.  **Отправить данные (POST):** При отправке формы загружать картинку на `https://32.javascript.htmlacademy.pro/kekstagram`.
3.  **Обработать ошибки:** Если сервер упал или интернет пропал, показать красивое сообщение, а не просто "молчание" в консоли.

### 2. Структура и модули
Где писать код?
-   В `main.js` у меня точка входа. Там я сейчас вызываю генерацию моков. Это нужно будет убрать.
-   Логика общения с сетью (`fetch`) — это отдельная ответственность. Лучше вынести в `api.js`.
-   Показ сообщений ("Успех", "Ошибка") — это UI. Можно в `message.js`.
-   Отправка формы происходит в `validation.js` (там у меня обработчик `submit`). Туда нужно "прокинуть" функцию отправки.

### 3. Реализация по шагам

#### Шаг 1: API (api.js)
Начну с "фундамента". Мне нужна функция, которая делает запрос. `fetch` возвращает промис.
Я напишу универсальную функцию `load`, которая будет принимать маршрут, метод, тело запроса и коллбэки успеха/ошибки. Или просто вернет промис. Промис гибче.

```javascript
// js/api.js

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Универсальная функция запроса
// Почему так сложно? Чтобы не дублировать код для GET и POST.
const load = (route, errorText, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(); // Выбрасываем ошибку, чтобы попасть в catch
      }
      return response.json(); // Разбираем JSON
    })
    .catch(() => {
      throw new Error(errorText); // Прокидываем текст ошибки дальше
    });

// Функция получения данных "наружу"
const getData = () => load(Route.GET_DATA, 'Не удалось загрузить данные');

// Функция отправки
const sendData = (body) => load(Route.SEND_DATA, 'Не удалось отправить форму', 'POST', body);

export { getData, sendData };
```

#### Шаг 2: Обработка получения данных (main.js)
Теперь идем в `main.js`.
Было:
```javascript
const photos = createPhotos(); // Случайные
renderPictures(photos);
```
Стало:
```javascript
import { getData } from './api.js';

getData()
  .then((photos) => {
    renderPictures(photos); // Рисуем только когда данные пришли!
  })
  .catch((err) => {
    showAlert(err.message); // Надо показать ошибку
  });
```

#### Шаг 3: Сообщения (message.js)
Мне нужны красивые алерты. В HTML есть шаблоны `#success` и `#error`.
Логика такая:
1.  Клонируем шаблон.
2.  Добавляем в `body`.
3.  Вешаем обработчик на `Esc` и клик вне области, чтобы закрыть.

```javascript
// js/message.js
// Тут важно следить за обработчиками. Если сообщение закрылось, надо удалить removeEventListener,
// иначе они будут копиться и вызывать баги.

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content.cloneNode(true);
  const element = template.querySelector(`.${type}`);

  // ... логика закрытия (remove element, remove listener) ...

  document.body.append(element);
}
```

#### Шаг 4: Отправка формы (validation.js)
В `validation.js` у меня есть `form.addEventListener('submit', ...)`.
Сейчас там `evt.preventDefault()` и всё.
Надо:
1.  Проверить валидацию (`pristine.validate()`).
2.  Если ок — заблокировать кнопку (чтобы юзер не нажал 10 раз).
3.  Вызвать `sendData`.
4.  Если успех — закрыть форму, показать "Ура".
5.  Если ошибка — НЕ закрывать форму, показать "Ой".
6.  В любом случае — разблокировать кнопку.

```javascript
// js/validation.js

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton(); // Кнопка "Сохраняю..."
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage(); // Форма остается!
      })
      .finally(unblockSubmitButton); // Возвращаем кнопку
  }
});
```

</details>

<details>
<summary>module12-task1: Фильтрация изображений</summary>

### 1. Анализ задачи
Данные загрузились (25 штук). Но что если их будет 1000? Юзер хочет смотреть "популярные" или "случайные".
В HTML есть блок `.img-filters`, он скрыт. Его надо показать после загрузки.

**Требования:**
1.  **По умолчанию:** Как пришло с сервера.
2.  **Случайные:** 10 уникальных.
3.  **Обсуждаемые:** Сортировка по `comments.length` (убывание).
4.  **Debounce:** Не перерисовывать чаще, чем раз в 0.5 сек, если юзер быстро тыкает кнопки.

### 2. Мысли про архитектуру
-   Где хранить исходный массив? В модуле фильтрации или в `main.js`? Лучше в фильтре, чтобы он сам ими управлял. Или передавать каждый раз.
-   Очистка: `renderPictures` сейчас просто добавляет (`appendChild`). Если вызвать его второй раз, картинки продублируются. Надо научить его очищать контейнер.

### 3. Реализация

#### Шаг 1: Очистка (gallery.js)
Добавляю удаление старых картинок перед вставкой новых.
```javascript
// js/gallery.js
const renderPictures = (photos) => {
  // Ищем все старые .picture и удаляем
  container.querySelectorAll('.picture').forEach(el => el.remove());
  // ... дальше как было
};
```

#### Шаг 2: Утилиты (util.js)
Нужен `debounce`. Это стандартная функция из учебника.
И нужна "перемешка" для случайных. `Math.random() - 0.5` подойдет для учебного проекта.

#### Шаг 3: Логика фильтра (filter.js)
Создам модуль `filter.js`.
В нем будет функция `initFilters`, которой я отдам загруженные фото и функцию отрисовки.

```javascript
// js/filter.js

const initFilters = (photos, renderCb) => {
  // Показываем кнопки
  filtersContainer.classList.remove('img-filters--inactive');

  // Вешаем обработчик (делегирование)
  filtersContainer.addEventListener('click', (evt) => {
    // 1. Меняем класс активности у кнопок
    // 2. Сортируем массив
    let result = [];
    if (id === 'filter-default') result = photos;
    if (id === 'filter-random') result = shuffle(photos).slice(0, 10);
    if (id === 'filter-discuss') result = photos.sort(byComments);

    // 3. Рисуем (с задержкой!)
    renderCb(result);
  });
}
```

#### Шаг 4: Связка (main.js)
Самый важный момент — где применить `debounce`?
Я оберну `renderPictures` в `debounce` и передам результат в `initFilters`.

```javascript
// js/main.js
import { debounce } from './util.js';

getData().then((data) => {
  renderPictures(data); // Первый раз рисуем сразу
  const debouncedRender = debounce(renderPictures);
  initFilters(data, debouncedRender); // Фильтр будет дергать "тормознутую" функцию
});
```

</details>

<details>
<summary>module12-task2: Загрузка пользовательского изображения</summary>

### 1. Анализ задачи
Сейчас при клике на "Загрузить" открывается форма с заглушкой (котик). А юзер хочет видеть СВОЕ фото.
Нужно перехватить файл, который юзер выбрал в `<input type="file">`, прочитать его и подставить в `src` картинки превью и в `backgroundImage` миниатюр эффектов.

### 2. Инструменты
Для чтения файлов на клиенте используется `FileReader` или `URL.createObjectURL()`. Второй способ проще и современнее.

### 3. Реализация

#### Шаг 1: Где перехватить? (form.js)
У меня уже есть обработчик `change` на инпуте, который открывает форму (`openUploadForm`). Это идеальное место. Перед открытием формы я подменю картинку.

#### Шаг 2: Код
Мне нужно:
1.  Взять файл: `input.files[0]`.
2.  Проверить расширение (вдруг юзер загрузил pdf или exe?). Сделаю массив `['jpg', 'png', ...]`.
3.  Создать URL: `URL.createObjectURL(file)`.
4.  Найти картинку превью и все `.effects__preview`.
5.  Заменить `src` и `style.backgroundImage`.

```javascript
// js/form.js

const openUploadForm = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  // Простая проверка расширения ('some.jpg'.endsWith('jpg'))
  const isImage = ['jpg', 'png', 'jpeg'].some(ext => fileName.endsWith(ext));

  if (isImage) {
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    effectsPreviews.forEach(el => el.style.backgroundImage = `url(${url})`);
  }

  // ... дальше старый код открытия формы (remove hidden)
}
```

Вот и всё! Теперь форма по-настоящему интерактивна.

</details>
