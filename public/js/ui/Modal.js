/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('Modal element is required');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const dismissButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    
    dismissButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.onClose();
      });
    });
  }

  onClose() {
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.display = 'none';
  }
}

export default Modal;
