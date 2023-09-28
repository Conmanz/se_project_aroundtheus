export default class UserInfo {
  constructor(userNameSelector, descriptionNameSelector) {
    this._nameElement = document.querySelector(userNameSelector);
    this._descriptionElement = document.querySelector(descriptionNameSelector);
  }

  getUserInfo() {
    const userInput = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
    return userInput;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
}
