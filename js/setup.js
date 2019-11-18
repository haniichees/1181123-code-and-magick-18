'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var wizardCoatSetup = userDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesSetup = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireballSetup = userDialog.querySelector('.setup-fireball-wrap');
  var fireballElement = userDialog.querySelector('.setup-fireball');
  var inputCoat = userDialog.querySelector('[name = "coat-color"]');
  var inputEyes = userDialog.querySelector('[name = "eyes-color"]');
  var inputFireball = userDialog.querySelector('[name = "fireball-color"]');
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.util.compareNames(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
    window.render(wizards);
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('request-error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  };

  var coatClickHandler = window.util.debounce(function () {
    var randColor = window.util.getRandomArrayElement(WIZARD_COAT_COLORS);
    coatColor = randColor;
    window.util.changeColor(randColor, wizardCoatSetup, inputCoat, 'fill');
    updateWizards();
  });

  var eyesClickHandler = window.util.debounce(function () {
    var randColor = window.util.getRandomArrayElement(WIZARD_EYES_COLORS);
    eyesColor = randColor;
    window.util.changeColor(randColor, wizardEyesSetup, inputEyes, 'fill');
    updateWizards();
  });

  var fireballClickHandler = function () {
    var randColor = window.util.getRandomArrayElement(WIZARD_FIREBALL_COLORS);
    window.util.changeColor(randColor, fireballElement, inputFireball, 'backgroundColor');
  };

  wizardCoatSetup.addEventListener('click', coatClickHandler);
  wizardEyesSetup.addEventListener('click', eyesClickHandler);
  wizardFireballSetup.addEventListener('click', fireballClickHandler);
  form.addEventListener('submit', formSubmitHandler);

  window.backend.load(successHandler, errorHandler);
})();
