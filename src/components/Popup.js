function eventHandler(popup, e) {}

export default class Popup {
  /*
   * Property is needed in order to store event listener callback, as removeEventListener does not work
   * when trying to remove an event listener with an anonymous function as the callback
   */
  #handleEscapeCloseCallback;

  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClose = this._popupElement.querySelector(".modal__close");
    this.#handleEscapeCloseCallback = this._handleEscapeClose.bind(this);

    this.setEventListeners();
  }

  _handleEscapeClose({ key }) {
    console.log(`handleEscapeClose() - key: ${key}`);
    if (key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this.#handleEscapeCloseCallback);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.#handleEscapeCloseCallback);
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
