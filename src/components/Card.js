export default class Card {
  #name;
  #link;
  #isLiked;
  #owner;
  #cardId;
  #createdAt;
  #cardTemplateSelector;
  #cardElement;
  #cardLikeButton;
  #cardDeleteButton;
  #cardImageEl;
  #cardTitleEl;
  #handleCardClick;
  #handleCardLike;
  #handleCardDislike;
  #handleCardDelete;
  #handleClickDeleteButton;
  #confirmDeletePopup;

  constructor(
    { name, link, isLiked, owner, _id, createdAt },
    cardTemplateSelector,
    handleCardClick,
    confirmDeletePopup,
    handleCardLike,
    handleCardDislike,
    handleCardDelete
  ) {
    this.#name = name;
    this.#link = link;
    this.#isLiked = isLiked;
    this.#owner = owner;
    this.#cardId = _id;
    this.#createdAt = createdAt;
    this.#cardTemplateSelector = cardTemplateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleCardLike = handleCardLike;
    this.#handleCardDislike = handleCardDislike;
    this.#handleCardDelete = handleCardDelete;
    this.#confirmDeletePopup = confirmDeletePopup;

    this.#handleClickDeleteButton = this._handleClickDeleteButton.bind(this);
  }

  #setEventListeners() {
    this.#cardDeleteButton = this.#cardElement.querySelector(".card__delete-button");

    this.#cardLikeButton.addEventListener("click", () => {
      this.#handleClickLikeButton();
    });

    this.#cardDeleteButton.addEventListener("click", () => {
      this.#confirmDeletePopup.setSubmitAction(this.#handleClickDeleteButton);
      this.#confirmDeletePopup.open();
    });

    this.#cardImageEl.addEventListener("click", () => {
      this.#handleCardClick(this.#link, this.#name);
    });
  }

  _handleClickDeleteButton() {
    this.#handleCardDelete(this.#cardId).then(() => {
      this.#confirmDeletePopup.close();
      this.#cardElement.remove();
    });
  }

  #handleClickLikeButton() {
    if (this.#isLiked) {
      this.#handleCardDislike(this.#cardId).then(() => {
        this.#isLiked = !this.#isLiked;
      });
      this.#cardLikeButton.classList.remove("card__liked-heart");
    } else {
      this.#handleCardLike(this.#cardId).then(() => {
        this.#isLiked = !this.#isLiked;
      });
      this.#cardLikeButton.classList.add("card__liked-heart");
    }
  }

  getCardElement() {
    const cardTemplate = document.querySelector(this.#cardTemplateSelector).content.firstElementChild;
    this.#cardElement = cardTemplate.cloneNode(true);
    this.#cardImageEl = this.#cardElement.querySelector(".card__image");
    this.#cardTitleEl = this.#cardElement.querySelector(".card__label-title");
    this.#cardImageEl.src = this.#link;
    this.#cardImageEl.alt = this.#name;
    this.#cardTitleEl.textContent = this.#name;
    this.#cardLikeButton = this.#cardElement.querySelector(".card__like-button");

    if (this.#isLiked) {
      this.#cardLikeButton.classList.add("card__liked-heart");
    }

    this.#setEventListeners();

    return this.#cardElement;
  }

  getCardData() {
    return {
      name: this.#name,
      link: this.#link,
      createdAt: this.#createdAt,
      _id: this.#cardId,
      isLiked: this.#isLiked,
    };
  }
}
