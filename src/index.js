import Api from "./api.js";
import Card from "./card.js";
import CardList from "./cardList.js";
import FormValidation from "./formValidation.js";
import Popup from "./popup.js";
import UserInfo from "./userInfo.js";
import "./style.css";


(function () {
  const api = new Api({
    //baseUrl: 'http://95.216.175.5/cohort7',
    baseUrl: 'https://praktikum.tk/cohort7',
    headers: {
      authorization: '733ad404-17c3-485d-9074-456390901feb',
      'Content-Type': 'application/json'
    }
  });

  (function () {
    function LoadingUserInformo(res) {
      const userName = document.querySelector('.user-info__name');
      const userAbout = document.querySelector('.user-info__job');
      const userPhoto = document.querySelector('.user-info__photo');

      userName.textContent = res.name;
      userAbout.textContent = res.about;
      userPhoto.style = `background-image: url(${res.avatar});`;

    }
    //1. Загрузка информации о пользователе с сервера 
    function loadingApi() {
      api.loadingUserInformation()
        .then((res) => {
          LoadingUserInformo(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
    loadingApi();
  })();

  (function () {
    //const createCard = (obj) => new Card(obj);  //функция которая создает карточку
    const createCard = (obj) => new Card(obj, api);
    const placesList = document.querySelector('.places-list');
    const cardList = new CardList(placesList, createCard, api);

    //2.Загрузка первоначальных карточек с сервера
    cardList.render();

    const button1 = document.querySelector('.popup__button');
    button1.addEventListener('click', newCard);

    function loadingApiNewCard(name, link, button) {
      api.UX(true, button);
      api.addCardServer(name, link) //4. Добавление новой карточки
        .then((res) => {
          cardList.addCard(res, 1);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          api.UX(false, button);
        });
    }

    function newCard() {
      event.preventDefault();
      const form = document.forms.new;
      const name = form.elements.name;
      const link = form.elements.link;
      const popup = document.querySelector('.popup');
      if (event.target.classList.contains('button_active')) {
        loadingApiNewCard(name.value, link.value, button1);
        form.reset();
      }
    }
    const popup = document.querySelector('.popup');
    const userInfoButton = document.querySelector('.user-info__button');
    const popupNewCard = new Popup(popup, userInfoButton);

    const popupEdit = document.querySelector('.popup_edit-profile');
    const userInfoButtonEdit = document.querySelector('.user-info__button-edit');
    const popupEditProfile = new Popup(popupEdit, userInfoButtonEdit);

  })();

  (function () {

    //объект userInfo для подставлении информации о себе в попапе
    const form = document.querySelector('.popup__form_new');
    const newForm = new FormValidation(form);
    const formEdit = document.querySelector('.popup__form_editProfile');
    const newformEdit = new FormValidation(formEdit);

    const divUserInfo = document.querySelector('.user-info');
    const userInfo = new UserInfo(divUserInfo, api);

    const formName = formEdit.elements.name;
    const formJob = formEdit.elements.job;
    const button = document.querySelector('.popup_edit-profile .popup__button');
    const buttonEditForm = document.querySelector('.user-info__button-edit');

    function substitutrForm() {
      event.preventDefault();
      userInfo.setUserInfo(formName.value, formJob.value, button);//3.Редактирование профиля на сервере
      userInfo.updateUserInfo();
    }

    function qetUserInfo() {
      formName.value = document.querySelector('.user-info__name').textContent;
      formJob.value = document.querySelector('.user-info__job').textContent;
    }

    button.addEventListener('click', substitutrForm);
    buttonEditForm.addEventListener('click', qetUserInfo);
  })();

})();