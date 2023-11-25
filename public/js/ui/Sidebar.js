/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */

class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');

    toggleButton.addEventListener('click', () => {
      const body = document.querySelector('body');

      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');

      console.log('click')
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginButton = document.querySelector('.menu-item.login');
    const registerButton = document.querySelector('.menu-item.register');
    const logoutButton = document.querySelector('.menu-item.logout');

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        const loginModal = App.getModal('#modal-login');
        loginModal.open();
      });
    }

    if (registerButton) {
      registerButton.addEventListener('click', () => {
        const registerModal = App.getModal('#modal-register');
        registerModal.open();
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', async () => {
        const response = await User.logout();
        if (response.success) {
          App.setState('init');
        }
      });
    }
  }
}