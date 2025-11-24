const ALERT_SHOW_TIME = 5000;

const successMessageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessageTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const dataErrorTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const showAlert = (message) => {
  const alertContainer = dataErrorTemplate.cloneNode(true);
  if (message) {
    alertContainer.querySelector('.data-error__title').textContent = message;
  }
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function hideMessage () {
  const messageElement =
    document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

function onBodyClick (evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
    evt.stopPropagation();
  }
}

const showMessage = (template, closeButtonClass) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  messageElement
    .querySelector(closeButtonClass)
    .addEventListener('click', hideMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
};

const showSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

export { showAlert, showSuccessMessage, showErrorMessage };
