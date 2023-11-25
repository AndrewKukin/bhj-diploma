/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
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