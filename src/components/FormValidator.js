export default class FormValidator {
  #settings;
  #formElement;
  #inputEls;
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
    if (!this.#submitButton.classList.contains(this.#settings.inactiveButtonClass)) {
      this.#submitButton.classList.add(this.#settings.inactiveButtonClass);
    }

    if (!this.#submitButton.disabled) {
      this.#submitButton.disabled = true;
    }
  }

  #enableButton() {
    if (this.#submitButton.classList.contains(this.#settings.inactiveButtonClass)) {
      this.#submitButton.classList.remove(this.#settings.inactiveButtonClass);
    }

    if (this.#submitButton.disabled) {
      this.#submitButton.disabled = false;
    }
  }

  // toggle submit button state
  #toggleButtonState() {
    if (!this.#inputEls.every((inputEl) => inputEl.validity.valid)) {
      this.#disableButton();
    } else {
      this.#enableButton();
    }
  }

  // set event handlers
  #setEventListeners() {
    const { inputSelector } = this.#settings;
    this.#inputEls = [...this.#formElement.querySelectorAll(inputSelector)];
    this.#inputEls.forEach((element) => {
      element.addEventListener("input", (e) => {
        this.#checkInputValidity(element);
        this.#toggleButtonState();
      });
    });
  }

  // enables form validation
  enableValidation() {
    this.#submitButton = this.#formElement.querySelector(this.#settings.submitButtonSelector);
    this.#setEventListeners();
  }

  resetForm() {
    this.#formElement.reset();
    this.#toggleButtonState();
  }
}
