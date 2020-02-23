export default class FormValidation {
  constructor(form) {
    this.form = form;
    this.setEventListeners(this.form);
  }
  checkInputValidity(event) {//чтобы валидировать поля.
    this.validForm(event.target.parentElement);
    this.resetError(event.target.parentElement, event.target);
    this.validElem(event.target, event.target.parentElement);
  }

  setSubmitButtonState(event) {//делает кнопку активной/неактивной
    event.preventDefault();
    this.validForm(this.form);
  }
  setEventListeners(form) {//Добавляет необходимые для валидации обработчики всем полям формы.
    const name = form.elements[0];
    const link = form.elements[1];
    const submit = form.querySelector('.popup__button');

    submit.addEventListener('click', this.setSubmitButtonState.bind(this));
    name.addEventListener('input', this.checkInputValidity.bind(this));
    link.addEventListener('input', this.checkInputValidity.bind(this));
  }
  resetError(form, input) { //убирает сообщение об ошибке
    const errorElement = form.querySelector(`.error__${input.name}`);
    errorElement.textContent = '';
  }
  validElem(element, form) { //проверяет валидность отдельных инпутов
    const errorElement = form.querySelector(`.error__${element.name}`);
    const words = { validationLenght: 'Должно быть от 2 до 30 символов', validationRequiredField: 'Это обязательное поле' };
    if (!element.checkValidity()) {
      if (!element.value) {
        errorElement.textContent = words.validationRequiredField;
      }
      else if (!element.classList.contains('.popup__input_type_link-url')) {
        errorElement.textContent = words.validationLenght;
      }
      return false;
    }
    return true;
  }

  validForm(form) { //проверяет валидность всей формы
    const inputs = Array.from(form);
    let flagValid = true;

    inputs.forEach((elem) => {
      if (elem.classList.contains('popup__input')) {
        if (!this.validElem(elem, form)) flagValid = false;
      }
    });
    this.setSubmitButton(flagValid, form);
  }

  setSubmitButton(flag, form) { //делает кнопку активной/неактивной
    const button = form.querySelector('.popup__button');
    if (flag) {
      button.classList.add('button_active');
    }
    else {
      button.classList.remove('button_active');
    }
  }

}

