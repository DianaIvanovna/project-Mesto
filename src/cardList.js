export default class CardList{
  constructor(container,createCard,api){
    this.api=api;
    this.container = container;
    this.createCard = createCard;
  }
  addCard(obj,...rest){
    const card = this.createCard(obj); // для создания карточки вызываем эту колбэк 
    const cardElement = card.create(obj);    //вызываем создание карточки  здесь, а не в её конструкторе класса
    if (rest[0]===1) 
    {
      cardElement.querySelector('.place-card__delete-icon').classList.add('delete-icon_active');
    }
    this.container.insertBefore(cardElement,this.container.querySelector('.place-card')); //новые карточки вставляются вперед
  }
  render(){
    this.api.LoadingInitialCards()
      .then((res) => {
        for (const card of res)
        {
          this.addCard(card);//отрисовала карточки
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}
  