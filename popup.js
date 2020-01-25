
class Popup{
  constructor(popup,popupOpen){
    this.popup=popup;
    this.popupClose=popup.querySelector('.popup__close');
    this.popupOpen=popupOpen;
    this.popupButton=popup.querySelector('.popup__button');
    this.openAndCloseForm = this.openAndCloseForm.bind(this);
    this.setEventListeners();
  }

  openAndCloseForm(){
    // при открытие формы, кнопка становится неактивной 
    if (event.target.classList.contains('popup__button'))
    {
      if (event.target.classList.contains('button_active'))
      {
        // когда нажали на кнопку добавить и когда она активна
        this.popupButton.classList.remove('button_active');
        this.popup.classList.remove('popup_is-opened');
      }
    }
    else
    {
      this.popupButton.classList.remove('button_active');
      this.popup.classList.toggle('popup_is-opened');
    }
  }
  setEventListeners(){
    this.popupOpen.addEventListener('click',this.openAndCloseForm);
    this.popupClose.addEventListener('click',this.openAndCloseForm);
    this.popupButton.addEventListener('click',this.openAndCloseForm);
  }
}


//3. Открытие попапа с картинкой

(function () {
  const popupImageClosed = document.querySelector('.popup__close_image');
  
  const findLink = (event) => {
    const link = event.target.style.backgroundImage;
    const link2 = link.substr(5, (link.length - 7));
    return link2;
  };
  
  const openAndClosePopupImage = () => document.querySelector('.popup_image').classList.toggle('popup_is-opened');
  
  
  const openingPicture = (event) => {
    const popupImageLink = document.querySelector('.popup__image');
    const link = findLink(event);
    popupImageLink.setAttribute('src', link);
    openAndClosePopupImage();
  };
  
  //3. Открытие попапа с картинкой
  
  function popupImage(event) { if (event.target.classList.contains('place-card__image')) openingPicture(event); }
  
  window.addEventListener('click', popupImage);
  popupImageClosed.addEventListener('click', openAndClosePopupImage);
})();
