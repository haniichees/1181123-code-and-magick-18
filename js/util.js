'use strict';
(function() {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var x = setup.style.left;
  var y = setup.style.top;

  window.util = {
    onButtonClose: function(evt) {
      var current = evt.target;
      if (evt.keyCode === ESC_KEYCODE && current !== userNameInput) {
        setup.classList.add('hidden');
        setup.style.left = x;
        setup.style.top = y;
      }
      if (evt.keyCode === ENTER_KEYCODE && current === setupClose) {
        setup.classList.add('hidden');
        setup.style.left = x;
        setup.style.top = y;
      }
    },

    onButtonEnter: function(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        setup.classList.remove('hidden');
        document.addEventListener('keydown', window.util.onButtonClose);
      }
    },

    // настройки загрузки/отправки/ошибок
    setupRequest: function(onLoad, onError) {
      var serverTime = 10000;
      var statusOk = 200;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function() {
        if (xhr.status === statusOk) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function() {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function() {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = serverTime;

      return xhr;
    },
    // показ ошибки
    showError: function(error) {
      var errorModal = document.createElement('div');
      errorModal.style = 'position: absolute; height: auto; width: 500px; left: 50%; top: 50%; padding: 20px; background: #89a1fd; border: 1px solid #333; z-index: 9999; transform: translate(-50%, -50%); box-shadow: 5px 5px 0 rgba(0, 0, 0, .5);';
      errorModal.classList.add('error');
      var errorMessage = document.createElement('h1');
      errorMessage.style = 'color: white; text-shadow: none; font-size: 30px';
      errorMessage.textContent = error;
      errorModal.appendChild(errorMessage);
      document.body.appendChild(errorModal);
    },

    setupClose: setupClose,
    setupOpen: setupOpen,
    x: x,
    y: y
  };

  // обработчики событий валидации имени
  userNameInput.addEventListener('invalid', function(evt) {
    var target = evt.target;
    switch (target.value.length) {
      case 0:
        return userNameInput.setCustomValidity('Обязательное поле');
      case 1:
        return userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      default:
        return userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
    }
  });

  userNameInput.addEventListener('input', function(evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов!');
    } else {
      target.setCustomValidity('');
    }
  });
})();
