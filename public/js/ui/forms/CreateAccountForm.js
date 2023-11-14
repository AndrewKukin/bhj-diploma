/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */

import AsyncForm from "./AsyncForm.js";
import Account from "../../api/Account.js";

class CreateAccountForm extends AsyncForm {

  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();


        const modal = App.getModal(this.element.closest('.modal').id);
        if (modal) {
          modal.close();
        }

        App.update();
      } else {
        console.error('Account creation failed:', response ? response.error : err);
      }
    });
  }
}

export default CreateAccountForm;