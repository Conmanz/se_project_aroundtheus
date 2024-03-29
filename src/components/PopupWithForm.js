import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #inputElements;

  constructor({ popupSelector, handleFormSubmit, handleFormClose }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormClose = handleFormClose;
    this._setEventListeners();
  }

  _setEventListeners() {
    this.#inputElements = this._popupForm.querySelectorAll(".modal__input");

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._handleFormClose();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    this.#inputElements.forEach((inputElements) => {
      inputValues[inputElements.name] = inputElements.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this.#inputElements.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
}
