/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */

import AsyncForm from "./AsyncForm.js";

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

export default LoginForm;