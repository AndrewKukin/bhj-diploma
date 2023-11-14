/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
  
    xhr.open(options.method || 'GET', options.url);
    xhr.responseType = 'json';
  
    xhr.onload = () => {
      if (xhr.status === 200) {
        options.callback?.(null, xhr.response);
      } else {
        options.callback?.(new Error(`Request failed with status ${xhr.status}`));
      }
    };
  
    xhr.onerror = () => {
      options.callback?.(new Error('Request failed'));
    };
  
    if (options.method === 'GET') {
      const urlParams = new URLSearchParams(options.data);
      const fullUrl = `${options.url}?${urlParams.toString()}`;
      xhr.open('GET', fullUrl);
      xhr.send();
    } else {
      const formData = new FormData();
      for (const key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.send(formData);
    }
  };
  
  export default createRequest;