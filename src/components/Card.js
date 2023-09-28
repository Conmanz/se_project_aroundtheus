import PopupWithImage from "./PopupWithImage";

export default class Card {
  #name;
  #link;
  #cardTemplateSelector;
  #cardElement;
  #cardLikeButton;
  #cardDeleteButton;
  #cardImageEl;
  #cardTitleEl;
  #bigPictureImg;
  #bigPictureFooter;

  constructor({ name, link }, cardTemplateSelector) {
    this.#name = name;
    this.#link = link;
    this.#cardTemplateSelector = cardTemplateSelector;
  }

  #setEventListeners() {
    this.#cardLikeButton = this.#cardElement.querySelector(".card__like-button");
    this.#cardDeleteButton = this.#cardElement.querySelector(".card__delete-button");

    this.#cardLikeButton.addEventListener("click", () => {
      this.#handleLikeIcon();
    });
    this.#cardDeleteButton.addEventListener("click", () => {
      this.#handleDeleteIcon();
    });

    this.#cardImageEl.addEventListener("click", () => {
      const bigPicturePopup = new PopupWithImage({ popupSelector: "#image-modal" });
      bigPicturePopup.open({
        link: this.#link,
        name: this.#name,
      });
    });
  }

  #handleLikeIcon() {
    this.#cardLikeButton.classList.toggle("card__liked-heart");
  }

  #handleDeleteIcon() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  getCardElement() {
    const cardTemplate = document.querySelector(this.#cardTemplateSelector).content.firstElementChild;
    this.#cardElement = cardTemplate.cloneNode(true);
    this.#cardImageEl = this.#cardElement.querySelector(".card__image");
    this.#cardTitleEl = this.#cardElement.querySelector(".card__label-title");
    this.#cardImageEl.src = this.#link;
    this.#cardImageEl.alt = this.#name;
    this.#cardTitleEl.textContent = this.#name;

    this.#bigPictureFooter = document.querySelector(".modal__image_footer");
    this.#bigPictureImg = document.querySelector(".big-picture-img");
    this.#bigPictureImg.src = this.#link;
    this.#bigPictureImg.alt = this.#name;
    this.#bigPictureFooter.textContent = this.#name;

    this.#setEventListeners();

    return this.#cardElement;
  }
}
