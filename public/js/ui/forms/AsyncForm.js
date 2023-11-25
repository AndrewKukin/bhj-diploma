/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('AsyncForm element is required');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    return data;
  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }

  onSubmit(options) {
  }
}