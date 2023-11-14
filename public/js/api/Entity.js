/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
import createRequest from './createRequest.js';

class Entity {
  static URL = '';

  static list(data, callback) {
    createRequest({
      url: Entity.URL,
      method: 'GET',
      data,
      callback,
    });
  }

  static create(data, callback) {
    createRequest({
      url: Entity.URL,
      method: 'PUT',
      data,
      callback,
    });
  }

  static remove(data, callback) {
    createRequest({
      url: Entity.URL,
      method: 'DELETE',
      data,
      callback,
    });
  }
}

export default Entity;
