export default class Api {
  static _makeCall(httpMethod, apiMethod, id, postParams, cb) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const responseType = xhr.getResponseHeader('content-type');
        if (responseType.includes('application/json')) {
          cb(JSON.parse(xhr.responseText));
        } else {
          cb(xhr.responseText);
        }
      }
    });

    const host = process.env.NODE_ENV === 'production' ? 'https://daria-chizh.herokuapp.com/' : 'http://localhost:5555';
    let url = `${host}/?method=${apiMethod}`;
    if (id) {
      url += `&id=${id}`;
    }

    xhr.open(httpMethod, url);
    if (httpMethod === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(postParams);
    } else {
      xhr.send();
    }
  }

  static allTickets(cb) {
    this._makeCall('GET', 'allTickets', undefined, undefined, cb);
  }

  static ticketById(id, cb) {
    this._makeCall('GET', 'ticketById', id, undefined, cb);
  }

  static updateTicket(id, params, cb) {
    this._makeCall('POST', 'updateTicket', id, params, cb);
  }

  static createTicket(params, cb) {
    this._makeCall('POST', 'createTicket', undefined, params, cb);
  }

  static deleteTicket(id, cb) {
    this._makeCall('POST', 'deleteTicket', id, undefined, cb);
  }
}
