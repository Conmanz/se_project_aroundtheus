export default class UserInfo {
  #nameElement;
  #descriptionElement;
  #avatarElement;

  constructor({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
    this.#nameElement = document.querySelector(".profile__title");
    this.#descriptionElement = document.querySelector(".profile__description");
    this.#avatarElement = document.querySelector(".profile__image");
  }

  getUserInfo() {
    const userInput = {
      name: this._name,
      about: this._about,
    };
    return userInput;
  }

  setUserInfo({ name, about, avatar }) {
    this._name = name;
    this.#nameElement.textContent = name;
    this._about = about;
    this.#descriptionElement.textContent = about;

    if (avatar) {
      this._avatar = avatar;
      this.#avatarElement.src = avatar;
    }
  }
}
