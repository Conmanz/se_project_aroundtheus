const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Elements
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardAddButton = document.querySelector(".profile__plus-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddCloseButton = cardAddModal.querySelector(".modal__close");
const addCardImageURL = document.querySelector("#card-description-input");
const addCardTitleInput = document.querySelector("#card-title-input");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const bigPictureCloseButton = document.querySelector(
  "#big-picture-modal__close"
);
const bigPictureModal = document.querySelector("#image-modal");
const bigPictureFooter = document.querySelector(".modal__image_footer");

//Fuctions
function openModal(modal) {
  modal.classList.add("modal_opened");
  const modalContainer = modal.querySelector("div.modal > div");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  const modalContainer = modal.querySelector("div.modal > div");
}

function isModalOpen(modal) {
  return modal.classList.contains("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__label-title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  // Handles clicking the heart button on each card
  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__liked-heart")) {
      cardLikeButton.classList.remove("card__liked-heart");
    } else {
      cardLikeButton.classList.add("card__liked-heart");
    }
  });
  const cardTrashButton = cardElement.querySelector(".card__delete-button");

  // Handles removing cards from list
  cardTrashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const bigPictureImg = document.querySelector(".big-picture-img");
  bigPictureImg.src = cardData.link;
  bigPictureImg.alt = cardData.name;

  bigPictureFooter.textContent = cardData.name;
  cardImageEl.addEventListener("click", () => {
    bigPictureImg.src = cardData.link;
    bigPictureImg.alt = cardData.name;
    bigPictureFooter.textContent = cardData.name;
    openModal(bigPictureModal);
  });

  return cardElement;
}

function addNewCard(e) {
  e.preventDefault();
  const cardElement = getCardElement({
    name: addCardTitleInput.value,
    link: addCardImageURL.value,
  });
  cardListEL.prepend(cardElement);
  closeModal(cardAddModal);
}

//Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

//Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  addCardTitleInput.value = "";
  addCardImageURL.value = "";
  openModal(cardAddModal);
});

cardAddCloseButton.addEventListener("click", () => {
  closeModal(cardAddModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddForm.addEventListener("submit", addNewCard);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEL.append(cardElement);
});

bigPictureCloseButton.addEventListener("click", (e) => {
  closeModal(bigPictureModal);
});

document.addEventListener("keydown", ({ key }) => {
  if (key === "Escape") {
    if (isModalOpen(profileEditModal)) {
      closeModal(profileEditModal);
    }

    if (isModalOpen(cardAddModal)) {
      closeModal(cardAddModal);
    }

    if (isModalOpen(bigPictureModal)) {
      closeModal(bigPictureModal);
    }
  }
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscape);
}

function handleEscape({ key }) {
  if (key === "Escape") {
    if (isModalOpen(profileEditModal)) {
      closeModal(profileEditModal);
    }

    if (isModalOpen(cardAddModal)) {
      closeModal(cardAddModal);
    }

    if (isModalOpen(bigPictureModal)) {
      closeModal(bigPictureModal);
    }
  }
}
