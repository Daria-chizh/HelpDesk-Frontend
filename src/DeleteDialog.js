import Api from './Api';

export default class DeleteDialog {
  show(ticket) {
    this.ticketToDelete = ticket;
    this.dialogElement.classList.remove('hidden');
  }

  _addListeners() {
    this.dialogElement.querySelector('.closeDialog').onclick = (event) => {
      this.dialogElement.classList.add('hidden');
      event.preventDefault();
    };

    this.dialogElement.querySelector('#deleteForm').onsubmit = (event) => {
      Api.deleteTicket(this.ticketToDelete.id, () => {
        this.dialogElement.classList.add('hidden');
        this.tickets.refresh();
      });
      event.preventDefault();
    };
  }

  constructor(tickets) {
    this.dialogElement = document.getElementById('dialogDelete');
    this.tickets = tickets;
    this._addListeners();
  }
}
