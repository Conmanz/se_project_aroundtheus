export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClose = this._popupElement.querySelector(".modal__close");
    this._popupImage = document.querySelector(".big-picture-img");
  }

  open() {
    //opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    //closes popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    //Listens for esc button
    if (EventTarget.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    //set event listeners
    this._popupClose.addEventListener("click", () => {
      this.close();
    });
  }
}
