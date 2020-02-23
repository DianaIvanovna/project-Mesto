export default class Api {
  constructor(options) {
    this.options = options;
  }
  loadingUserInformation() //1. Загрузка информации о пользователе с сервера
  {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.status;
      });
  }
  LoadingInitialCards() //2.Загрузка первоначальных карточек с сервера
  {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      });
  }
  UX(val, button) {
    let initialText = '';
    if (val) {
      initialText = button.textContent;
      button.textContent = 'Загрузка...';
    }
    else button.textContent = initialText;
  }
  editUserInformation(userName, userAbout) //3. Редактирование профиля
  {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
  }

  addCardServer(cardName, cardLink) //4. Добавление новой карточки
  {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(res.status);
      });
  }

  deleteCard(id) {//6. Удаление карточки
    fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then((res) => {
        if (!res.ok) console.log(res.status);
      });
  }


  settingAndRemovingLikes(id, val) {//7. Постановка и снятие лайка
    if (val) {
      return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
        method: 'PUT',
        headers: this.options.headers,
      })
        .then((res) => {
          if (res.ok) return res.json();
          else return Promise.reject(res.status);
        })
    }
    else {
      return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
        method: 'DELETE',
        headers: this.options.headers,
      })
        .then((res) => {
          if (res.ok) return res.json();
          else return Promise.reject(res.status);
        })
    }
  }

}


