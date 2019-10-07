'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var x = setup.style.left;
  var y = setup.style.top;

  window.util = {
    onButtonClose: function (evt) {
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

    onButtonEnter: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        setup.classList.remove('hidden');
        document.addEventListener('keydown', window.util.onButtonClose);
      }
    },

    setupClose: setupClose,
    setupOpen: setupOpen,
    x: x,
    y: y
  };

  // обработчики событий валидации имени
  userNameInput.addEventListener('invalid', function (evt) {
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

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов!');
    } else {
      target.setCustomValidity('');
    }
  });
})();
