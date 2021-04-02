import Api from './Api';

export default class TicketRenderer {
  _renderTicketStatus(ticketElement, ticket) {
    const checkBoxElement = document.createElement('input');
    checkBoxElement.setAttribute('type', 'checkbox');
    checkBoxElement.classList.add('checkBoxElement');
    checkBoxElement.addEventListener('change', (event) => {
      event.stopPropagation();
      Api.updateTicket(ticket.id, `status=${String(checkBoxElement.checked)}`, () => {
        this.tickets.refresh();
      });
    });
    if (ticket.status === true) {
      checkBoxElement.setAttribute('checked', 'checked');
    }

    const cellCheckboxElement = document.createElement('td');
    cellCheckboxElement.appendChild(checkBoxElement);

    ticketElement.appendChild(cellCheckboxElement);
  }

  static _renderText(text) {
    const textContainer = document.createElement('div');
    textContainer.textContent = text;
    const cellElement = document.createElement('td');
    cellElement.appendChild(textContainer);
    return cellElement;
  }

  static _renderTicketName(ticketElement, ticket) {
    const nameCell = TicketRenderer._renderText(ticket.name);
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('descContainer');
    nameCell.appendChild(descriptionContainer);
    ticketElement.appendChild(nameCell);
  }

  static _formatDateElement(dateElement) {
    return String(dateElement).padStart(2, '0');
  }

  static _renderCreatedTime(ticketElement, ticket) {
    const date = new Date(ticket.created);
    const timePart = `${TicketRenderer._formatDateElement(date.getHours())}:${TicketRenderer._formatDateElement(date.getMinutes())}`;
    const shortYear = date.getFullYear().toString().substr(2, 2);
    const datePart = `${TicketRenderer._formatDateElement(date.getDate())}.${TicketRenderer._formatDateElement(date.getMonth() + 1)}.${shortYear}`;
    const dateCell = TicketRenderer._renderText(`${datePart} ${timePart}`);
    ticketElement.appendChild(dateCell);
  }

  _renderDeleteAction(ticketElement, ticket) {
    const removeButton = TicketRenderer._renderText('✖');
    removeButton.onclick = (event) => {
      this.tickets.showDeleteDialog(ticket);
      event.stopPropagation();
    };
    ticketElement.appendChild(removeButton);
  }

  _renderEditAction(ticketElement, ticket) {
    const editButton = TicketRenderer._renderText('✎');
    editButton.onclick = (event) => {
      this.tickets.showEditDialog(ticket);
      event.stopPropagation();
    };
    ticketElement.appendChild(editButton);
  }

  static _showFullTicket(ticketElement, fullTicket) {
    const descContainer = ticketElement.querySelector('.descContainer');
    descContainer.textContent = fullTicket.description;
  }

  static _addListeners(ticketElement, ticket) {
    ticketElement.addEventListener('click', () => {
      Api.ticketById(ticket.id, (fullTicket) => {
        TicketRenderer._showFullTicket(ticketElement, fullTicket);
      });
    });
  }

  renderTicket(ticket) {
    const ticketElement = document.createElement('tr');
    ticketElement.classList.add('tr');

    this._renderTicketStatus(ticketElement, ticket);
    TicketRenderer._renderTicketName(ticketElement, ticket);
    TicketRenderer._renderCreatedTime(ticketElement, ticket);
    this._renderDeleteAction(ticketElement, ticket);
    this._renderEditAction(ticketElement, ticket);
    TicketRenderer._addListeners(ticketElement, ticket);

    return ticketElement;
  }

  constructor(tickets) {
    this.tickets = tickets;
  }
}
