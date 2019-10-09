'use strict';
(function () {
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireBall = document.querySelector('.setup-fireball-wrap');
  var setupParent = document.querySelector('.setup-wizard-appearance');
  var ballInput = setupFireBall.querySelector('input[name="fireball-color"]');
  var coatInput = setupParent.querySelector('input[name="coat-color"]');
  var eyesInput = setupParent.querySelector('input[name="eyes-color" ]');

  // функция передающая цвет, который следует за текущим
  var getNextColor = function (currentColor, colors) {
    var index = colors.indexOf(currentColor);
    var result = ++index === colors.length ? colors[0] : colors[index];
    return result;
  };

  // изменение цвета фаерболлов при нажатии на них
  setupFireBall.addEventListener('click', function (evt) {
    var nextColor = getNextColor(ballInput.value, window.data.FIREBALLS_COLOR);
    evt.currentTarget.style.background = nextColor;
    ballInput.value = nextColor;
  });
  // изменение цвета мантии при нажатии на неё
  wizardCoat.addEventListener('click', function (evt) {
    var nextColor = getNextColor(coatInput.value, window.data.WIZARD_COAT_COLOR);
    evt.currentTarget.style.fill = nextColor;
    coatInput.value = nextColor;
  });
  // изменение цвета глаз при нажатии на них
  wizardEyes.addEventListener('click', function (evt) {
    var nextColor = getNextColor(eyesInput.value, window.data.WIZARD_EYES_COLOR);
    evt.currentTarget.style.fill = nextColor;
    eyesInput.value = nextColor;
  });
})();
