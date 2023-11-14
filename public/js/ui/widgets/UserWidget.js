/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {

  constructor(element) {
    if (!element) {
      throw new Error("Элемент не передан");
    }

    this.element = element;

    this.update();
  }

  update() {
    const currentUser = User.current();

    if (currentUser) {
      const userNameElement = this.element.querySelector('.user-name');
      
      if (userNameElement) {
        userNameElement.textContent = currentUser.name;
      }
    }
  }
}

export default UserWidget;
