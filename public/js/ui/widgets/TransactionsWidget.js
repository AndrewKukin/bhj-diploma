class TransactionsWidget {

  constructor(element) {
    if (!element) {
      throw new Error("Элемент не передан");
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const createIncomeButton = this.element.querySelector(".create-income-button");
    const createExpenseButton = this.element.querySelector(".create-expense-button");

    createIncomeButton.addEventListener("click", () => {
      const modal = App.getModal("newIncome");
      modal.open();
    });

    createExpenseButton.addEventListener("click", () => {
      const modal = App.getModal("newExpense");
      modal.open();
    });
  }
}

export default TransactionsWidget;