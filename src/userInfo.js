export default class UserInfo{
  constructor(divUserInfo,api){
    this.api=api;
    this.divUserInfo=divUserInfo;
    this.nameElement=this.divUserInfo.querySelector('.user-info__name');
    this.jobElement=this.divUserInfo.querySelector('.user-info__job');
    this.nameElementContent=this.nameElement.textContent;
    this.jobElementContent=this.jobElement.textContent;
  }

  setUserInfo(name, job,button){  //setUserInfo, чтобы обновлять данные внутри экземпляра класса 
    this.api.UX(true, button);
    this.api.editUserInformation(name,job)//3.Редактирование профиля на сервере
      .then((res) => {
        if (!res.ok) console.log(`Ошибка: ${res.status}`);
      })
      .finally(() => {
        this.api.UX(false, button);
      });
    this.nameElementContent=name;
    this.jobElementContent=job;
  }
  updateUserInfo(){//updateUserInfo, чтобы отображать эти данные на странице
    this.nameElement.textContent=this.nameElementContent;
    this.jobElement.textContent=this.jobElementContent;
  }
}
  

