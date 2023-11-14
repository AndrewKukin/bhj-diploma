/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */

import createRequest from './createRequest.js';
import Entity from './Entity.js';

class Transaction extends Entity {
  static URL = '/transaction';

  static get(id, callback) {
    createRequest({
      url: `${Transaction.URL}/${id}`,
      method: 'GET',
      callback,
    });
  }
}

export default Transaction;