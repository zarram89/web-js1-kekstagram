# Личный проект «Кекстаграм»

* Автор: [Рамиль Зарипов](https://github.com/zarram89).

## История разработки

### 1. Setup and Data Generation
**Цель**: Подключить скрипты и реализовать генерацию тестовых данных.
**Реализация**:
- **`js/main.js`**: Подключен к `index.html`. Реализована логика генерации массива из 25 объектов фотографий со случайными лайками, комментариями и описанием.
- **`js/util.js`**: Созданы вспомогательные функции `getRandomInteger`, `getRandomArrayElement`, `createIdGenerator`.

### 2. Modulation
**Цель**: Разделить код на ES2015 модули.
**Реализация**:
- **`js/data.js`**: Вынесена логика генерации данных.
- **`js/util.js`**: Вынесены утилитарные функции.
- **`js/main.js`**: Стал точкой входа, импортирующей необходимые модули.

### 3. Render Thumbnails
**Цель**: Отрисовать миниатюры фотографий на странице.
**Реализация**:
- **`js/thumbnail.js`**: Создан модуль для отрисовки элементов на основе шаблона `#picture` с использованием `DocumentFragment` для оптимизации.

### 4. Big Picture View
**Цель**: Реализовать просмотр фотографии в полноэкранном режиме.
**Реализация**:
- **`js/big-picture.js`**: Создан модуль для управления модальным окном (открытие, закрытие, подстановка данных).
- **`js/gallery.js`**: Реализована обработка кликов по миниатюрам (делегирование) и вызов окна просмотра.

### 5. Comment Loader
**Цель**: Реализовать подгрузку комментариев порциями ("Load more").
**Реализация**:
- **`js/big-picture.js`**: Добавлена логика отображения комментариев по 5 штук. Реализован счетчик показанных комментариев и управление видимостью кнопки загрузки.

### 6. Form Validation
**Цель**: Реализовать валидацию формы загрузки изображения.
**Реализация**:
- **`js/form.js`**: Создан модуль для работы с формой.
- **Библиотека Pristine**: Подключена для валидации хэштегов (формат, количество, уникальность) и длины комментария.
- **`index.html`**: Добавлены атрибуты `action`, `method`, `enctype`.

### 7. Image Editing
**Цель**: Реализовать масштабирование и применение эффектов к изображению.
**Реализация**:
- **`js/scale.js`**: Реализована логика зума (25% - 100%).
- **`js/effect.js`**: Реализовано применение CSS-фильтров с помощью слайдера `noUiSlider`.
- **`js/form.js`**: Интегрирован сброс масштаба и эффектов при закрытии формы.

### 8. Server Interaction
**Цель**: Заменить моковые данные на реальные с сервера и реализовать отправку формы через AJAX.
**Реализация**:
- **`js/api.js`**: Создан модуль-обертка над `fetch` для методов GET и POST.
- **`js/message.js`**: Создан модуль для показа сообщений об успехе/ошибке и алертов.
- **`js/main.js`**: Добавлен запрос данных при загрузке страницы.
- **`js/form.js`**: Реализована отправка данных формы, блокировка кнопки отправки и показ сообщений.

### 9. Image Filtering
**Цель**: Реализовать фильтрацию загруженных фотографий (По умолчанию, Случайные, Обсуждаемые).
**Реализация**:
- **`js/filter.js`**: Реализована логика сортировки и выборки фотографий.
- **`js/util.js`**: Добавлена функция `debounce` для устранения дребезга.
- **`js/gallery.js`**: Доработан для очистки контейнера и перерисовки галереи.
- **`js/main.js`**: Инициализация фильтров после загрузки данных.

### 10. User Photo Upload
**Цель**: Реализовать предпросмотр загружаемой пользователем фотографии.
**Реализация**:
- **`js/form.js`**: Добавлена обработка события `change` на поле ввода файла.
    - Проверка расширения файла (jpg, jpeg, png).
    - Использование `URL.createObjectURL` для создания ссылки на файл.
    - Обновление `src` главного превью и `backgroundImage` миниатюр эффектов.

# Kekstagram Project Tasks

## Setup and Data Generation

- Connect `main.js` to `index.html`
- Implement data generation logic in `main.js`
- Create helper functions for random numbers and array elements
- Create comment generation logic
- Create photo description generation logic
- Generate array of 25 photo objects

## Modulation

- Create `js/util.js` for helper functions
- Create `js/data.js` for data generation
- Refactor `js/main.js` to use imports

## Render Thumbnails

- Create `js/thumbnail.js` module
- Implement rendering logic using DocumentFragment
- Connect `thumbnail.js` to `main.js`

## Big Picture View

- Create `js/big-picture.js` module
- Update `js/thumbnail.js` to add data attributes
- Create `js/gallery.js` to handle interactions
- Connect `gallery.js` to `main.js`

## Comment Loader

- Show comment count and loader in `big-picture.js`
- Implement batch rendering logic (5 at a time)
- Update comment counter
- Handle "Load more" button visibility

## Form Validation

- Update `index.html` form attributes
- Create `js/form.js` module
- Implement form open/close logic
- Integrate Pristine validation library
- Implement hashtag validation rules
- Implement comment validation rules
- Handle Esc key behavior for inputs
- Connect `form.js` to `main.js`

## Image Editing

- Update `index.html` to include noUiSlider
- Create `js/scale.js` for image zooming
- Create `js/effect.js` for image effects
- Integrate scaling and effects into `form.js`

## Server Interaction

- Create `js/api.js` for fetch requests
- Create `js/message.js` for success/error messages
- Update `js/main.js` to fetch data and render gallery
- Update `js/form.js` to send data via AJAX
- Implement error handling for data loading
- Implement success/error handling for form submission

## Image Filtering

- Update `js/util.js` with `debounce`
- Refactor `js/thumbnail.js` to clear container
- Refactor `js/gallery.js` to handle updates
- Create `js/filter.js` module
- Implement filter logic (Default, Random, Discussed)
- Update `js/main.js` to initialize filters

## User Photo Upload

- Update `js/form.js` to handle file reading
- Update preview image source
- Update effect preview thumbnails

---

## Implementation Plan - Image Editing

### Goal Description
Implement image scaling (zoom) and effects (filters) using noUiSlider.

### Proposed Changes

#### Project Root
**[MODIFY] `index.html`**
- Add `<link rel="stylesheet" href="vendor/nouislider/nouislider.css">` in `<head>`
- Add `<script src="vendor/nouislider/nouislider.js"></script>` before `main.js`

#### JS Directory
**[NEW] `scale.js`**
- Constants: SCALE_STEP (25), MIN_SCALE (25), MAX_SCALE (100), DEFAULT_SCALE (100)
- Elements: Scale input, smaller button, bigger button, image preview
- Functions:
  - `scaleImage(value)`: Updates the input value and image transform style
  - `onSmallerButtonClick()`: Decreases scale
  - `onBiggerButtonClick()`: Increases scale
  - `resetScale()`: Resets to default
- Exports: resetScale

**[NEW] `effect.js`**
- Constants: Effect definitions (style, min, max, step, unit)
- Elements: Effect level slider, effect level value, effect radio buttons, image preview
- Functions:
  - `updateSlider()`: Updates slider options based on selected effect
  - `onEffectsChange(evt)`: Handles effect selection
  - `onSliderUpdate()`: Handles slider value change and updates image style
  - `resetEffects()`: Resets to original
- Exports: resetEffects

**[MODIFY] `form.js`**
- Import resetScale from `./scale.js`
- Import resetEffects from `./effect.js`
- Call resetScale() and resetEffects() in `hideModal()`

(Implicitly) The event listeners in scale.js and effect.js will need to be attached. I will probably initialize them or just let the module side-effects handle it if I select elements globally. However, it's cleaner to export an init function or just attach listeners if the elements exist. Given the structure, I'll attach listeners in the modules but ensure they are only active when the form is open, or just always active since the form is in the DOM.

Refinement: I will export resetScale and resetEffects and call them when the form closes. I will also make sure the listeners are set up.

### Verification Plan
#### Manual Verification
- User Action: Open form
- User Action: Click zoom buttons
- Expected Result: Image scales, input value changes (25-100%)
- User Action: Select effects
- Expected Result: Slider appears (except for Original), image filter changes
- User Action: Move slider
- Expected Result: Filter intensity changes
- User Action: Switch effect
- Expected Result: Slider resets to max, filter applies
- User Action: Close form and reopen
- Expected Result: Scale and effects reset

---

## Implementation Plan - Server Interaction

### Goal Description
Replace mock data with real data from the server and implement AJAX form submission with user feedback messages.

### Proposed Changes

#### JS Directory
**[NEW] `api.js`**
- Constants: BASE_URL, Route (GET: /data, POST: /)
- Functions:
  - `getData()`: Fetches photo data. Returns a promise
  - `sendData(body)`: Sends form data. Returns a promise
  - `load(route, errorText, method, body)`: Generic fetch wrapper

**[NEW] `message.js`**
- Functions:
  - `showErrorMessage()`: Shows #error template. Handles closing (click, Esc)
  - `showSuccessMessage()`: Shows #success template. Handles closing (click, Esc)
  - `showAlert(message)`: Shows #data-error template for 5 seconds

**[MODIFY] `main.js`**
- Import getData from `./api.js`
- Import `renderGallery` from `./gallery.js`
- Import showAlert from `./message.js`
- Call getData():
  - On success: `renderGallery`
  - On error: showAlert

**[MODIFY] `form.js`**
- Import sendData from `./api.js`
- Import showSuccessMessage, showErrorMessage from `./message.js`
- Update `onFormSubmit`:
  - Prevent default
  - Validate form
  - If valid, disable submit button
  - Call sendData(new FormData(evt.target))
  - On success: `hideModal()`, showSuccessMessage()
  - On error: showErrorMessage()
  - Finally: Enable submit button

Note: When #error is shown, the form should remain open. The Esc key listener on the document might conflict with the message's Esc listener. I need to ensure that if the error message is open, closing it doesn't close the form, or the form's Esc listener ignores it if the message is open.

Strategy: message.js will stop propagation of Esc if needed, or `form.js` will check if an error message is open. Actually, the requirements say "If an error occurs... the user should be able to send the form again", so the form stays open. The error message is an overlay on top of the form.

### Verification Plan
#### Manual Verification
- User Action: Reload page
- Expected Result: Photos load from server (check Network tab). If error, alert shows
- User Action: Open form, upload image, submit valid form
- Expected Result: Form sends POST request. Success message appears. Form closes
- User Action: Submit form, simulate server error (offline or modify URL)
- Expected Result: Error message appears. Form stays open
- User Action: Close error message
- Expected Result: Form is still there, data preserved

---

## Implementation Plan - Image Filtering

### Goal Description
Implement image filtering (Default, Random, Discussed) with debounce to manage large datasets.

### Proposed Changes

#### JS Directory
**[MODIFY] `util.js`**
- Add and export debounce(callback, timeoutDelay) function

**[MODIFY] `thumbnail.js`**
- Update `renderThumbnails` to clear existing thumbnails (elements with class .picture) from the container before appending new ones

**[MODIFY] `gallery.js`**
- Refactor to store pictures in a module-level variable
- Move event listener setup to the top level (executed once)
- `renderGallery` should only update the pictures variable and call `renderThumbnails`

**[NEW] `filter.js`**
- Constants: Filter enum (DEFAULT, RANDOM, DISCUSSED)
- Variables: Selectors for filter element and buttons
- Functions:
  - `initFilters(loadedPictures, callback)`:
    - Shows the filter block (.img-filters)
    - Sets up click listeners on buttons
    - Debounces the callback
  - `sortRandomly()`: Returns 10 random unique photos
  - `sortByComments()`: Sorts by comments length descending
  - `handleFilterClick(evt)`:
    - Updates active class
    - Filters data
    - Calls debounced callback

**[MODIFY] `main.js`**
- Import initFilters from `./filter.js`
- Import debounce from `./util.js`
- Inside `getData().then(...)`:
  - Call `renderGallery(pictures)`
  - Call initFilters(pictures, debounce(renderGallery))

### Verification Plan
#### Manual Verification
- User Action: Load page
- Expected Result: Filters appear. Default filter active. All photos shown
- User Action: Click "Random"
- Expected Result: 10 random photos shown
- User Action: Click "Discussed"
- Expected Result: Photos sorted by comments (most discussed first)
- User Action: Click "Default"
- Expected Result: All photos shown in original order
- User Action: Rapidly click filters
- Expected Result: Update happens only once every 500ms (debounce)
