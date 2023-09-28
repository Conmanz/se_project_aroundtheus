function handleEscapeClose({ key }, popup) {
  if (key === "Escape") {
    popup.close();
  }
}

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClose = this._popupElement.querySelector(".modal__close");
    this._popupImage = document.querySelector(".big-picture-img");
    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", (e) => handleEscapeClose(e, this));
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (e) => handleEscapeClose(e, this));
  }

  setEventListeners() {
    this._popupClose.addEventListener("click", () => {
      this.close();
    });

    // Handles clicking the overlay/outside the popup
    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }
}
