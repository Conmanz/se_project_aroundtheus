import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/constants.js";
import "../pages/index.css";
import { settings } from "../utils/constants.js";
import { Api } from "../components/API.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "82c856c8-7f8e-41ef-95ad-77b3d762e208",
    "Content-Type": "application/json",
  },
});

//Elements
const profileEditButton = document.querySelector("#profile__edit-button");
const cardAddButton = document.querySelector(".profile__plus-button");
const bigPicturePopup = new PopupWithImage({ popupSelector: "#image-modal" });

// Used to store our form validators
const formValidators = {};

const createValidators = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    // Create new instance of the validator for each form element
    const validator = new FormValidator(config, formElement);

    // Get the value of the 'name' attribute of the form element
    const formName = formElement.getAttribute("name");

    // Store the validator by the 'name' attribute of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

/* Card Functions */
const newCardPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardFormSubmit,
  handleFormClose: () => {
    formValidators["cardAddForm"].resetForm();
  },
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    (cardId) => api.likeCard(cardId),
    (cardId) => api.dislikeCard(cardId),
    (cardId) => api.deleteCard(cardId)
  );
  return card.getCardElement();
}

function handleCardFormSubmit(data) {
  api.createCard(data).then((res) => section.addItem(createCard(res)));
}

function handleCardClick(link, name) {
  bigPicturePopup.open({ link, name });
}

/* Card Event Listeners */
cardAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* Profile Edit Functions */
const userInfo = new UserInfo({});
const profileEditPopupForm = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    api.updateProfile(formData);

    /*
     * Cannot move resetForm() into handleFormClose, because for the profile edit modal, we don't want to
     * change the submit button's disabled state. The form is automatically filled with existing data, so
     * the submit button should never be disabled when opening the modal
     */
    formValidators["profileEditForm"].resetForm();
  },
  handleFormClose: () => {},
});

/* Profile Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileEditPopupForm.setInputValues(userInfo.getUserInfo());
  profileEditPopupForm.open();
});

/* Section Functions */
const section = new Section(
  {
    items: [], // Start with empty array to not render any cards
    renderer: (item) => createCard(item),
  },
  ".cards__list"
);

api.getAllData().then((res) => {
  const user = res[0];

  // Set user info
  userInfo.setUserInfo(user);

  const cards = res[1].reverse();
  cards.forEach((card) => {
    // Create new card element to render
    const cardElement = createCard(card);

    // Add card element to card section to be displayed
    section.addItem(cardElement);
  });
});

createValidators(settings);
section.renderItems();
