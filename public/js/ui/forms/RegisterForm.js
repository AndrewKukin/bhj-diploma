/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
import AsyncForm from "./AsyncForm.js";


class RegisterForm extends AsyncForm {
  onSubmit(options) {
    User.register(options, async (err, response) => {
      if (response && response.success) {
        // Сбрасываем форму
        this.element.reset();

        App.setState('user-logged');

        const modal = App.getModal(this.element.closest('.modal').id);
        if (modal) {
          modal.close();
        }
      } else {
        console.error('Registration failed:', response.error);
      }
    });
  }
}

export default RegisterForm;