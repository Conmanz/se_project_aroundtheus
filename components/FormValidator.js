export default class FormValidator {
  #settings;
  #formElement;
  #submitButton;

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

  #disableButton() {
    this.#submitButton.classList.add(this.#settings.inactiveButtonClass);
    this.#submitButton.disabled = true;
  }

  #enableButton() {
    this.#submitButton.classList.remove(this.#settings.inactiveButtonClass);
    this.#submitButton.disabled = false;
  }

  // toggle submit button state
  #toggleButtonState(inputEls) {
    if (!inputEls.every((inputEl) => inputEl.validity.valid)) {
      this.#disableButton();
    } else {
      this.#enableButton();
    }
  }

  // set event handlers
  #setEventListeners() {
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
  enableValidation() {
    this.#submitButton = this.#formElement.querySelector(this.#settings.submitButtonSelector);
    this.#setEventListeners();
  }

  // either disable state of button or reset form validation
  handleFormSubmitSuccess() {
    this.#formElement.reset();
    this.#disableButton();
  }
}
