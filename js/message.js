const ALERT_SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
  }
};

const onBodyClick = (evt) => {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  closeMessage();
};

function closeMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement) {
    messageElement.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onBodyClick);
}

const showMessage = (template, closeButtonClass) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector(closeButtonClass);
  closeButton.addEventListener('click', closeMessage);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onBodyClick);
};

const showSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
  // Важно: при ошибке мы не должны закрывать форму, поэтому stopPropagation здесь не нужен,
  // но логика закрытия формы по Esc в form.js должна учитывать, открыто ли сообщение.
  // В ТЗ сказано: "Сообщение должно удаляться... по нажатию на Esc".
  // Чтобы Esc не закрыл форму под сообщением, нам нужно в form.js проверить, нет ли сообщения.
};

const showAlert = () => {
  const alertElement = dataErrorTemplate.cloneNode(true);
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

export { showSuccessMessage, showErrorMessage, showAlert };
