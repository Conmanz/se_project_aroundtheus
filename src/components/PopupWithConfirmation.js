import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  #handleConfirm;
  #confirmButton;

  constructor(popupSelector) {
    super({ popupSelector });
    this.#handleConfirm = this._handleConfirm.bind(this);
    this._setEventListeners();
  }

  _setEventListeners() {
    this.#confirmButton = document.querySelector("#confirm-delete-modal__button");

    this.#confirmButton.addEventListener("click", this.#handleConfirm);
  }

  setSubmitAction(action) {
    this._confirmAction = action;
  }

  _handleConfirm(event) {
    event.preventDefault();
    this._confirmAction();
  }
}
