'use strict';

(function () {
  var API_URL = 'https://js.dump.academy/code-and-magick';

  var makeRequest = function (data, method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, API_URL + url);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('onError', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.send(data);
  };

  window.backend = {
    save: function (data, successHandler, errorHandler) {
      makeRequest(data, 'POST', '/', successHandler, errorHandler);
    },
    load: function (successHandler, errorHandler) {
      makeRequest(null, 'GET', '/data', successHandler, errorHandler);
    },
  };
})();
