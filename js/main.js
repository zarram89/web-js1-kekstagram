// Функция для генерации случайного целого числа в диапазоне от min до max (включительно)
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция для создания генератора уникальных ID
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// Константы для генерации данных
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Екатерина',
  'Дмитрий',
  'Анна',
  'Александр',
  'Ольга',
  'Максим',
  'Елена',
  'Сергей',
  'Наталья',
];

const DESCRIPTIONS = [
  'Закат на пляже',
  'Горный пейзаж',
  'Улица старого города',
  'Портрет друга',
  'Натюрморт с фруктами',
  'Архитектурная композиция',
  'Ночной город',
  'Весенние цветы',
  'Зимний лес',
  'Летний день в парке',
  'Осенние краски',
  'Морской берег',
  'Городская суета',
  'Тихий уголок природы',
  'Праздничное настроение',
  'Минималистичная композиция',
  'Абстрактное искусство',
  'Черно-белая фотография',
  'Винтажный стиль',
  'Современная архитектура',
  'Уличная фотография',
  'Макросъемка',
  'Панорамный вид',
  'Портрет в студии',
  'Репортажная съемка',
];

// Настройки генерации
const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

// Генераторы ID
const generateCommentId = createIdGenerator();

// Функция для создания комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: getRandomInteger(0, 1)
    ? getRandomArrayElement(MESSAGES)
    : `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`,
  name: getRandomArrayElement(NAMES),
});

// Функция для создания массива комментариев
const createComments = () => {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  return Array.from({ length: commentsCount }, createComment);
};

// Функция для создания объекта фотографии
const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

// Функция для создания массива фотографий
const createPhotos = () =>
  Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1));

// Генерация данных
const photos = createPhotos();

// Вывод данных в консоль для проверки
// eslint-disable-next-line no-console
console.log(photos);
