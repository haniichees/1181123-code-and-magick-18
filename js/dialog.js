'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupHandler = setup.querySelector('.upload');
  var setupForm = document.querySelector('.setup-wizard-form');

  // Открытие и закрытие окна насройки
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', window.util.onButtonClose);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style.left = window.util.x;
    setup.style.top = window.util.y;
  };

  window.util.setupOpen.addEventListener('click', function () {
    openPopup();
  });
  window.util.setupClose.addEventListener('click', function () {
    closePopup();
  });
  window.util.setupOpen.addEventListener('keydown', window.util.onButtonEnter);
  window.util.setupClose.addEventListener('keydown', window.util.onButtonEnter);

  // Перемещение окна настройки
  setupHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          setupHandler.removeEventListener('click', onClickPreventDefault);
        };
        setupHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), function () {
      setup.classList.add('hidden');
    }, window.util.showError);
    evt.preventDefault();
  });

})();
