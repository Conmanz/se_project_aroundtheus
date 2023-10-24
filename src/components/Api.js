export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authToken = headers.authorization;
    this._headers = headers;
  }

  /*User routes*/
  //Get the current user's info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)))
      .catch(console.error);
  }

  //Update your profile information
  updateProfile(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  //Update avatar
  updateProfileAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)))
      .catch(console.error);
  }

  /*Card routes*/
  //Get all cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)))
      .catch(console.error);
  }

  //Create a card
  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  //Delete a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  //Like a card
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  //Dislike a card
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  // Gets both user info and initial cards
  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
