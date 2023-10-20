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
  #cardDeleteConfirmModal;
  #cardDeleteConfirmModalButton;
  #cardImageEl;
  #cardTitleEl;
  #handleCardClick;
  #handleCardLike;
  #handleCardDislike;
  #handleCardDelete;
  #handleProfileChange;
  #profileImage;
  #profileDeleteButton;

  constructor(
    { name, link, isLiked, owner, _id, createdAt },
    cardTemplateSelector,
    handleCardClick,
    handleCardLike,
    handleCardDislike,
    handleCardDelete,
    handleProfileChange,
    profileImage,
    profileDeleteButton
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
    this.#handleProfileChange = handleProfileChange;
    this.#profileImage = profileImage;
    this.#profileDeleteButton = profileDeleteButton;
  }

  #setEventListeners() {
    this.#cardDeleteButton = this.#cardElement.querySelector(".card__delete-button");
    this.#cardDeleteConfirmModal = document.querySelector("#confirm-delete-modal");
    this.#cardDeleteConfirmModalButton = this.#cardDeleteConfirmModal.querySelector(".modal__button");
    this.#handleProfileChange = document.querySelector("#profile-edit-image");
    this.#profileImage = document.querySelector(".profile__image");
    this.#profileDeleteButton = this.#cardElement.querySelector("#profile-image-close");

    this.#cardLikeButton.addEventListener("click", () => {
      this.#handleClickLikeButton();
    });

    this.#cardDeleteButton.addEventListener("click", () => {
      this.#cardDeleteConfirmModal.classList.add("modal_opened");
    });

    this.#cardImageEl.addEventListener("click", () => {
      this.#handleCardClick(this.#link, this.#name);
    });

    this.#cardDeleteConfirmModalButton.addEventListener("click", () => {
      this.#cardDeleteConfirmModal.classList.remove("modal_opened");
      this.#handleClickDeleteButton();
    });

    this.#profileImage.addEventListener("click", () => {
      this.#handleProfileChange.classList.add("modal_opened");
    });

    // this.#profileDeleteButton.addEventListener("click", () => {
    //   this.#profileImage.classList.remove("modal_opened");
    // });
  }

  #handleClickDeleteButton() {
    this.#cardElement.remove();
    this.#cardElement = null;
    console.log("DELETE SHOULD HAPPEN HERE");
    // this.#handleCardDelete(this.#cardId);
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
