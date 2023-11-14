/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
import createRequest from './createRequest.js';
import Entity from './Entity.js';

class Account extends Entity {
  static URL = '/account';

  static get(id = '', callback) {
    createRequest({
      url: `${Account.URL}/${id}`,
      method: 'GET',
      callback,
    });
  }
}

export default Account;