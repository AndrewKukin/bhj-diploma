import Account from "../../api/Account.js";
import Transaction from "../../api/User.js";

class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * @param {HTMLElement} element - DOM элемент страницы
   */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не передан");
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * @param {Object} options - Параметры страницы
   */
  update(options) {
    this.render(options);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('transaction__remove')) {
        const transactionId = event.target.dataset.id;
        this.removeTransaction(transactionId);
      }

      if (event.target.classList.contains('remove-account')) {
        this.removeAccount();
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   */
  removeAccount() {
    const isConfirmed = confirm('Вы действительно хотите удалить счёт?');

    if (isConfirmed) {
      const { account_id } = this.lastOptions;

      Account.remove({ id: account_id }, (err, response) => {
        if (response && response.success) {
          this.clear();
          App.updateWidgets();
          App.updateForms();
        } else {
          console.error('Failed to remove account:', response ? response.error : err);
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждения действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * для обновления приложения
   * @param {string} id - Идентификатор транзакции
   */
  removeTransaction(id) {
    const isConfirmed = confirm('Вы действительно хотите удалить эту транзакцию?');

    if (isConfirmed) {
      Transaction.remove({ id }, (err, response) => {
        if (response && response.success) {
          this.update();
        } else {
          console.error('Failed to remove transaction:', response ? response.error : err);
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * @param {Object} options - Параметры страницы
   */
  render(options) {
    this.lastOptions = options;

    const { account_id } = options;

    Account.get({ id: account_id }, (err, response) => {
      if (response && response.success) {
        const { name } = response.data;
        this.renderTitle(name);
      } else {
        console.error('Failed to get account details:', response ? response.error : err);
      }
    });

    Transaction.list({ account_id }, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      } else {
        console.error('Failed to get transactions:', response ? response.error : err);
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * @param {string} name - Название счета
   */
  renderTitle(name) {
    const titleElement = this.element.querySelector('.content-title');
    titleElement.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * @param {string} date - Дата в формате '2019-03-10 03:20:41'
   * @returns {string} - Отформатированная дата
   */
  formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * @param {Object} item - Объект с информацией о транзакции
   * @returns {string} - HTML-код транзакции
   */
  getTransactionHTML(item) {
    const { id, type, name, sum, created_at } = item;
    const formattedDate = this.formatDate(created_at);

    return `
      <div class="transaction transaction_${type.toLowerCase()} row">
          <div class="col-md-7 transaction__details">
            <div class="transaction__icon">
                <span class="fa fa-money fa-2x"></span>
            </div>
            <div class="transaction__info">
                <h4 class="transaction__title">${name}</h4>
                <div class="transaction__date">${formattedDate}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="transaction__summ">
                ${sum} <span class="currency">₽</span>
            </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${id}">
                  <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * @param {Array} data - Массив данных о транзакциях
   */
  renderTransactions(data) {
    const contentElement = this.element.querySelector('.content');
    contentElement.innerHTML = '';

    data.forEach(transaction => {
      const transactionHTML = this.getTransactionHTML(transaction);
      contentElement.insertAdjacentHTML('beforeend', transactionHTML);
    });
  }
}

export default TransactionsPage;