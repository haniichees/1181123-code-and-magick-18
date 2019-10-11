'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  // загрузка данных с сервера
  function load(onLoad, onError) {
    var xhr = window.util.setupRequest(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  // отправка данных на сервер
  function save(data, onLoad, onError) {
    var xhr = window.util.setupRequest(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }

  // экспорт
  window.backend = {
    load: load,
    save: save
  };
})();
