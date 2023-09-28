import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";

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
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditFormValidator = new FormValidator(settings, profileEditForm);

const profileEditButton = document.querySelector("#profile__edit-button");
const cardListEL = document.querySelector(".cards__list");
const cardAddButton = document.querySelector(".profile__plus-button");

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const cardAddFormValidator = new FormValidator(settings, cardAddForm);

/* Card Functions */
const newCardPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardFormSubmit,
});

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.getCardElement();
}

function handleCardFormSubmit(data) {
  cardListEL.prepend(createCard(data));
  cardAddFormValidator.handleFormSubmitSuccess();
}

/* Card Event Listeners */
cardAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

cardAddFormValidator.enableValidation();

/* Profile Edit Functions */
const userInfo = new UserInfo(".profile__title", ".profile__description");
const profileEditPopupForm = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profileEditFormValidator.handleFormSubmitSuccess();
  },
});

/* Profile Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileEditPopupForm.setInputValues(userInfo.getUserInfo());
  profileEditPopupForm.open();
});

profileEditFormValidator.enableValidation();

/* Section Functions */
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    section.getView(cardElement);
    return cardElement;
  },
});

initialCards.forEach((cardData) => {
  cardListEL.append(createCard(cardData));
});
