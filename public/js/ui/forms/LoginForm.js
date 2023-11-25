/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();

        App.setState('user-logged');

        const modal = this.element.closest('.modal');
        if (modal) {
          App.getModal(modal.id).close();
        }
      } else {
        console.error('Login failed:', response.error);
      }
    });
  }
}