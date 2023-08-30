import { openModal } from "../utils/utils.js";

export default class Card {
  #name;
  #link;
  #cardTemplateSelector;
  #cardElement;

  constructor({ name, link }, cardTemplateSelector) {
    this.#name = name;
    this.#link = link;
    this.#cardTemplateSelector = cardTemplateSelector;
  }

  #setEventListeners() {
    this.#cardElement.querySelector(".card__like-button").addEventListener("click", () => {
      this.#handleLikeIcon();
    });

    this.#cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
      this.#handleDeleteIcon();
    });
  }

  #handleLikeIcon() {
    this.#cardElement.querySelector(".card__like-button").classList.toggle("card__liked-heart");
  }

  #handleDeleteIcon() {
    this.#cardElement.remove();
    this.#cardElement = undefined;
  }

  getCardElement() {
    const cardTemplate = document.querySelector(this.#cardTemplateSelector).content.firstElementChild;
    this.#cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = this.#cardElement.querySelector(".card__image");
    const cardTitleEl = this.#cardElement.querySelector(".card__label-title");
    cardImageEl.src = this.#link;
    cardImageEl.alt = this.#name;
    cardTitleEl.textContent = this.#name;

    this.#setEventListeners();

    const bigPictureModal = document.querySelector("#image-modal");
    const bigPictureFooter = document.querySelector(".modal__image_footer");
    const bigPictureImg = document.querySelector(".big-picture-img");
    bigPictureImg.src = this.#link;
    bigPictureImg.alt = this.#name;
    bigPictureFooter.textContent = this.#name;

    cardImageEl.addEventListener("click", () => {
      bigPictureImg.src = this.#link;
      bigPictureImg.alt = this.#name;
      bigPictureFooter.textContent = this.#name;
      openModal(bigPictureModal);
    });

    return this.#cardElement;
  }
}
