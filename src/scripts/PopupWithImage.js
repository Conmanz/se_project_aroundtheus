import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = document.querySelector(".card__image");
    this._popupImageDescription = document.querySelector(".card__description");
  }
  setEventListeners() {
    super.setEventListeners();
  }
  open(data) {
    if (data) {
      this._popupImage.src = data.link;
      this._popupImage.alt = data.name;
      this._popupImageDescription.textContent = data.name;
    }
    super.open();
  }
  close() {
    super.close();
  }
}
