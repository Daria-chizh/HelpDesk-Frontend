import Api from './Api';

export default class ModifyDialog {
  _show(name, description, title) {
    this.ticketNameField.value = name;
    this.ticketDescriptionField.value = description;
    this.dialogTitle.innerText = title;
    this.dialogElement.classList.remove('hidden');
  }

  showToEdit(ticket) {
    this.ticketToUpdate = ticket;
    Api.ticketById(ticket.id, (fullTicket) => {
      this._show(ticket.name, fullTicket.description, 'Изменить тикет');
    });
  }

  showToAdd() {
    this.ticketToUpdate = null;
    this._show('', '', 'Добавить тикет');
  }

  _closeAndRefresh() {
    this.dialogElement.classList.add('hidden');
    this.tickets.refresh();
  }

  _addListeners() {
    this.dialogElement.querySelector('.closeDialog').onclick = (event) => {
      this.dialogElement.classList.add('hidden');
      event.preventDefault();
    };

    this.dialogElement.querySelector('#ticketForm').onsubmit = (event) => {
      const body = `name=${this.ticketNameField.value}&description=${this.ticketDescriptionField.value}`;
      if (this.ticketToUpdate) {
        Api.updateTicket(this.ticketToUpdate.id, body, () => this._closeAndRefresh());
      } else {
        Api.createTicket(body, () => this._closeAndRefresh());
      }
      event.preventDefault();
    };
  }

  constructor(tickets) {
    this.dialogElement = document.getElementById('dialogModify');
    this.dialogTitle = this.dialogElement.querySelector('.dialogTitle');
    this.ticketNameField = document.getElementById('ticketName');
    this.ticketDescriptionField = document.getElementById('ticketDescription');
    this.tickets = tickets;
    this._addListeners();
  }
}
