/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */

import AsyncForm from "./AsyncForm.js";
import Account from "../../api/Account.js";
import Transaction from "../../api/Transaction.js";

class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    // Находим выпадающий список
    const accountsList = this.element.querySelector('.accounts-select');

    // Очищаем список
    accountsList.innerHTML = '';

    // Загружаем счета
    Account.list({}, (err, response) => {
      if (response && response.success) {
        // Добавляем каждый счет в список
        response.data.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          accountsList.appendChild(option);
        });
      } else {
        console.error('Failed to load accounts:', response ? response.error : err);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    // Отправляем запрос на создание транзакции
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        // Сбрасываем форму
        this.element.reset();

        // Закрываем окно
        const modal = this.element.closest('.modal');
        if (modal) {
          App.getModal(modal.id).close();
        }

        // Обновляем приложение
        App.update();
      } else {
        console.error('Transaction creation failed:', response ? response.error : err);
      }
    });
  }
}

export default CreateTransactionForm;