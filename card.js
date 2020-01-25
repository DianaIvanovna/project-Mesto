class Card {
  constructor(cardData,api) {
    this.api=api;
    this.cardData=cardData;
    this.link = cardData.link;
    this.name = cardData.name;
    this.likes=cardData.likes;
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this._setHandlers = this._setHandlers.bind(this);

  }
  _setHandlers(placeCard){
    placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    placeCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
  }
  like(event) {
    const val=!event.target.classList.contains('place-card__like-icon_liked');

    this.api.settingAndRemovingLikes(this.cardData._id,val)
      .then((res) => {
        this.card.querySelector('.place-card__like-value').textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  remove() {
    if (window.confirm('Вы действительно хотите удалить эту карточку?'))
    {
      this.api.deleteCard(this.cardData._id);
      this.card.parentNode.removeChild(this.card);
    }
  }
  create(obj) {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card'); 
    placeCard.innerHTML = `
       <div class="place-card__image">
       <button class="place-card__delete-icon"></button>
       </div>
       <div class="place-card__description">
       <h3 class="place-card__name"></h3>
       <div class="place-card__like">
       <button class="place-card__like-icon"></button>
       <div class="place-card__like-value">0</div>
       </div>
       </div>`;
    placeCard.querySelector('.place-card__name').textContent = obj.name;
    placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${obj.link
    })`;
    placeCard.querySelector('.place-card__like-value').textContent=obj.likes.length;

    //5. Отображение количества лайков карточки
    //функция, которая проверяет, ставили ли мы под этим фото лайк, если да, то показывает это
    const ILike = (el)=>{
      if ((el.name==document.querySelector('.user-info__name').textContent)&&(el.about==document.querySelector('.user-info__job').textContent))
      {
        placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        return true;
      }
    };
    this.likes.some(ILike);

    this._setHandlers(placeCard); 
    this.card=placeCard;
    return placeCard;
  }
}
 