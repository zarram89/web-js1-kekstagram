const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = FILTER.DEFAULT;
let pictures = [];

const sortRandom = () => Math.random() - 0.5;

const sortDiscussed = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FILTER.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, 10);
    case FILTER.DISCUSSED:
      return [...pictures].sort(sortDiscussed);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;

    cb(getFilteredPictures());
  });
};

const initFilters = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export { initFilters };
