export default class UserInfo {
  #nameElement;
  #descriptionElement;
  #avatarElement;

  constructor({ name, about, avatar, _id, nameSelector, descriptionSelector, avatarSelector }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
    // this.#nameElement = document.querySelector(".profile__title");
    this.#nameElement = document.querySelector(nameSelector);
    // this.#descriptionElement = document.querySelector(".profile__description");
    this.#descriptionElement = document.querySelector(descriptionSelector);
    // this.#avatarElement = document.querySelector(".profile__image");
    this.#avatarElement = document.querySelector(avatarSelector);

    this.setUserInfo = this.setUserInfo.bind(this);
  }

  getUserInfo() {
    const userInput = {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
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
