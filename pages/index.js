import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal, closeModalOnRemoteClick } from "../utils/utils.js";

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

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Elements
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const cardListEL = document.querySelector(".cards__list");
const cardTemplateSelector = "#card-template";
const cardAddButton = document.querySelector(".profile__plus-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddCloseButton = cardAddModal.querySelector(".modal__close");
const addCardImageURL = document.querySelector("#card-description-input");
const addCardTitleInput = document.querySelector("#card-title-input");
const bigPictureCloseButton = document.querySelector("#big-picture-modal__close");
const bigPictureModal = document.querySelector("#image-modal");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardAddForm = cardAddModal.querySelector(".modal__form");

const profileEditFormValidator = new FormValidator(settings, profileEditForm);
const cardAddFormValidator = new FormValidator(settings, cardAddForm);

/* Card Functions */
function addNewCard() {
  const cardData = {
    name: addCardTitleInput.value,
    link: addCardImageURL.value,
  };
  cardListEL.prepend(createCard(cardData));
  closeModal(cardAddModal);
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector);
  return card.getCardElement();
}

/* Card Event Listeners */
cardAddButton.addEventListener("click", () => {
  addCardTitleInput.value = "";
  addCardImageURL.value = "";
  openModal(cardAddModal);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewCard();
  cardAddFormValidator.handleFormSubmitSuccess();
});

cardAddCloseButton.addEventListener("click", (e) => closeModal(cardAddModal));

bigPictureCloseButton.addEventListener("click", () => closeModal(bigPictureModal));

cardAddFormValidator.enableValidation();

/* Profile Functions */
function handleProfileEditSubmit() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

/* Profile Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleProfileEditSubmit();
  profileEditFormValidator.handleFormSubmitSuccess();
});

profileEditCloseButton.addEventListener("click", () => closeModal(profileEditModal));

profileEditFormValidator.enableValidation();

initialCards.forEach((cardData) => {
  cardListEL.append(createCard(cardData));
});

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
cardAddModal.addEventListener("mousedown", closeModalOnRemoteClick);
bigPictureModal.addEventListener("mousedown", closeModalOnRemoteClick);
