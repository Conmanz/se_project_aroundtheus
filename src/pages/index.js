import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
// import { initialCards } from "../utils/constants.js";
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
const profileAvatarImage = document.querySelector(".profile-avatar__button");
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

const confirmDeletePopup = new PopupWithConfirmation("#confirm-delete-modal");

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
    confirmDeletePopup,
    (cardId) => api.likeCard(cardId),
    (cardId) => api.dislikeCard(cardId),
    (cardId) => api.deleteCard(cardId)
  );
  return card.getCardElement();
}

function handleCardFormSubmit(data) {
  return api
    .createCard(data)
    .then((res) => section.addItem(createCard(res)))
    .catch(console.error);
}

function handleCardClick(link, name) {
  bigPicturePopup.open({ link, name });
}

/* Card Event Listeners */
cardAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* Profile Edit Functions */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});
const profileEditPopupForm = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    return api
      .updateProfile(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
        formValidators["profileEditForm"].resetForm();
      })
      .catch(console.error);
  },
  handleFormClose: () => {},
});

const profileAvatarEditPopupForm = new PopupWithForm({
  popupSelector: "#profile-avatar-edit-modal",
  handleFormSubmit: ({ avatar }) => {
    return api.updateProfileAvatar(avatar).then(userInfo.setUserInfo).catch(console.error);
  },
  handleFormClose: () => {
    formValidators["profileAvatarEditForm"].resetForm();
  },
});

/* Profile Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileEditPopupForm.setInputValues(userInfo.getUserInfo());
  profileEditPopupForm.open();
});

profileAvatarImage.addEventListener("click", () => {
  profileAvatarEditPopupForm.setInputValues(userInfo.getUserInfo());
  profileAvatarEditPopupForm.open();
});

/* Section Functions */
const section = new Section(
  {
    items: [], // Start with empty array to not render any cards
    renderer: (item) => createCard(item),
  },
  ".cards__list"
);

api
  .getAllData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cards.forEach((card) => {
      // Create new card element to render
      const cardElement = createCard(card);

      // Add card element to card section to be displayed
      section.addItem(cardElement);
    });
    section.renderItems(cards);
  })
  .catch(console.error);

createValidators(settings);
