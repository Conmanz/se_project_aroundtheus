import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupImage = document.querySelector(".big-picture-img");
    this._popupImageDescription = document.querySelector(".modal__image_footer");
  }

  open(data) {
    if (data) {
      this._popupImage.src = data.link;
      this._popupImage.alt = data.name;
      this._popupImageDescription.textContent = data.name;
    }
    super.open();
  }
}
