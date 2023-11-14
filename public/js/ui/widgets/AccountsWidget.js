class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не передан");
    }

    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const createAccountButton = document.querySelector(".create-account");
    createAccountButton.addEventListener("click", () => {
      const modal = App.getModal("newAccount");
      modal.open();
    });

    this.element.addEventListener("click", (event) => {
      const accountItem = event.target.closest(".account");
      if (accountItem) {
        this.onSelectAccount(accountItem);
      }
    });
  }

  update() {
    const currentUser = User.current();
    if (currentUser) {
      Account.list({}, (err, response) => {
        if (response && response.success) {
          this.clear();
          response.data.forEach((account) => {
            const accountHTML = this.getAccountHTML(account);
            this.renderItem(accountHTML);
          });
        } else {
          console.error("Failed to load accounts:", response ? response.error : err);
        }
      });
    }
  }

  clear() {
    const accounts = this.element.querySelectorAll(".account");
    accounts.forEach((account) => account.remove());
  }

  onSelectAccount(element) {
    const activeAccount = this.element.querySelector(".account.active");
    if (activeAccount) {
      activeAccount.classList.remove("active");
    }
    element.classList.add("active");

    const accountId = element.dataset.id;
    App.showPage("transactions", { account_id: accountId });
  }

  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <i class="fa fa-credit-card"></i> ${item.name}
        </a>
      </li>
    `;
  }

  renderItem(html) {
    this.element.insertAdjacentHTML("beforeend", html);
  }
}

export default AccountsWidget;
