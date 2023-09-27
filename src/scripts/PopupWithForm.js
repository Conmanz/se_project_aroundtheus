import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValues() {
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};
    inputElements.forEach((inputElements) => {
      inputValues[inputElements.name] = inputElements.value;
    });
    return inputValues;
  }
  setInputValues(data) {
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    inputElements.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }
}

// index.js

const newCardPopup = new PopupWithForm("#card-add-modal", () => {});
newCardPopup.open();

newCardPopup.close();
