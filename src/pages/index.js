import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/constants.js";
import "../pages/index.css";

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
const cardAddButton = document.querySelector(".profile__plus-button");

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

/* Section Functions */
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item),
  },
  ".cards__list"
);

/* Card Functions */
const newCardPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardFormSubmit,
});

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getCardElement();
}

function handleCardFormSubmit(data) {
  section.addItem(createCard(data));
  /*
   * handleFormSubmitSuccess() is called when we close the form, because we are not submitting the form
   * when we open the modal
   */
  formValidators["cardAddForm"].handleFormSubmitSuccess();
}

function handleCardClick(link, name) {
  const bigPicturePopup = new PopupWithImage({ popupSelector: "#image-modal" });
  bigPicturePopup.open({ link, name });
}

/* Card Event Listeners */
cardAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* Profile Edit Functions */
const userInfo = new UserInfo(".profile__title", ".profile__description");
const profileEditPopupForm = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    /*
     * handleFormSubmitSuccess() is called when we close the form, because we are not submitting the form
     * when we open the modal
     */
    formValidators["profileEditForm"].handleFormSubmitSuccess();
  },
});

/* Profile Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileEditPopupForm.setInputValues(userInfo.getUserInfo());
  profileEditPopupForm.open();
});

section.renderItems();

createValidators(settings);
