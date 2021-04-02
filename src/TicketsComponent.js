import Api from './Api';
import TicketRenderer from './TicketRenderer';
import DeleteDialog from './DeleteDialog';
import ModifyDialog from './ModifyDialog';

export default class TicketsComponent {
  _addListeners() {
    document.getElementById('addTicket').onclick = () => this.modifyDialog.showToAdd();
  }

  constructor() {
    this.tableElement = document.getElementById('table');
    this.ticketRenderer = new TicketRenderer(this);
    this.deleteDialog = new DeleteDialog(this);
    this.modifyDialog = new ModifyDialog(this);
    this._addListeners();
  }

  _renderTable(tickets) {
    this.tableElement.replaceChildren();
    for (const ticket of tickets) {
      const ticketElement = this.ticketRenderer.renderTicket(ticket);
      this.tableElement.appendChild(ticketElement);
    }
  }

  showDeleteDialog(ticket) {
    this.deleteDialog.show(ticket);
  }

  showEditDialog(ticket) {
    this.modifyDialog.showToEdit(ticket);
  }

  refresh() {
    Api.allTickets((tickets) => {
      this._renderTable(tickets);
    });
  }
}
