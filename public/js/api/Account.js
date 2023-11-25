/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
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