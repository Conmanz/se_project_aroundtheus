export default class FormValidator {
  #settings;
  #formElement;

  constructor(settings, formElement) {
    this.#settings = settings;
    this.#formElement = formElement;
  }

  // check field is valid
  #checkInputValidity(inputEl) {
    const { inputErrorClass, errorClass } = this.#settings;
    const errorMessageEl = this.#formElement.querySelector(`#${inputEl.id}-error`);
    if (!inputEl.validity.valid) {
      inputEl.classList.add(inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(errorClass);
    } else {
      inputEl.classList.remove(inputErrorClass);
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(errorClass);
    }
  }

  // toggle submit button state
  #toggleButtonState(inputEls) {
    const { inactiveButtonClass, submitButtonSelector } = this.#settings;
    const submitButton = this.#formElement.querySelector(submitButtonSelector);

    if (!inputEls.every((inputEl) => inputEl.validity.valid)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  // set event handlers
  #setEventListeners(submitHandler) {
    this.#formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      submitHandler();
      this.handleFormSubmitSuccess();
    });

    const { inputSelector } = this.#settings;
    const inputEls = [...this.#formElement.querySelectorAll(inputSelector)];
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this.#checkInputValidity(inputEl);
        this.#toggleButtonState(inputEls);
      });
    });
  }

  // enables form validation
  enableValidation(submitHandler) {
    this.#setEventListeners(submitHandler);
  }

  // either disable state of button or reset form validation
  handleFormSubmitSuccess() {
    this.#formElement.reset();
  }
}
