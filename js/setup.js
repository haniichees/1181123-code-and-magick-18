'use strict';

(function () {
  // ============================module3-task1=============================================
  var QUANTITY = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // функция, которая создает массив, состоящий из рандомных характеристик мага
  function getRandCharacteristics(wizardNames, wizardSurnames, wizardCoatColor, wizardEyesColor) {
    var randName = wizardNames[Math.floor(Math.random() * wizardNames.length)];
    var randSurname = wizardSurnames[Math.floor(Math.random() * wizardSurnames.length)];
    var randCoatColor = wizardCoatColor[Math.floor(Math.random() * wizardCoatColor.length)];
    var randEyesColor = wizardEyesColor[Math.floor(Math.random() * wizardEyesColor.length)];
    var randomCharacteristics = [randName, randSurname, randCoatColor, randEyesColor];
    return randomCharacteristics;
  }

  // фунцкия, которая создает рандомного мага и добавляет его в массив
  var getRandomWizard = function () {
    var randomCharacteristic = [];
    var randomWizardList = [];
    for (var i = 0; i < QUANTITY; i++) {
      randomCharacteristic[i] = getRandCharacteristics(WIZARD_NAMES, WIZARD_SURNAME, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);
      var randomWizard = {
        name: randomCharacteristic[i][0] + ' ' + randomCharacteristic[i][1],
        coatColor: randomCharacteristic[i][2],
        eyesColor: randomCharacteristic[i][3]
      };
      randomWizardList.push(randomWizard);
    }
    return randomWizardList;
  };

  //  функция, которая создает DOM-элемент на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // функция отрисовки шаблона в документ
  var drawingTemplToDocument = function (wizard) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizard.length; i++) {
      fragment.appendChild(renderWizard(wizard[i]));
    }
    return fragment;
  };
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  similarListElement.appendChild(drawingTemplToDocument(getRandomWizard()));

  // =============================module4-task1===================================
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

  // функции открытия и закрытия окна
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onButtonClose);
  };
  var closePopup = function () {
    setup.classList.add('hidden');
  };

  var onButtonClose = function (evt) {
    var current = evt.target;
    if (evt.keyCode === ESC_KEYCODE && current !== userNameInput) {
      closePopup();
    }
    if (evt.keyCode === ENTER_KEYCODE && current === setupClose) {
      closePopup();
    }
  };
  var onButtonEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  // обработчики событий открытия и закрытия окна
  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupClose.addEventListener('click', function () {
    closePopup();
  });
  setupOpen.addEventListener('keydown', onButtonEnter);
  setupClose.addEventListener('keydown', onButtonEnter);

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
    var nextColor = getNextColor(ballInput.value, FIREBALLS_COLOR);
    evt.currentTarget.style.background = nextColor;
    ballInput.value = nextColor;
  });
  // изменение цвета мантии при нажатии на неё
  wizardCoat.addEventListener('click', function (evt) {
    var nextColor = getNextColor(coatInput.value, WIZARD_COAT_COLOR);
    evt.currentTarget.style.fill = nextColor;
    coatInput.value = nextColor;
  });
  // изменение цвета глаз при нажатии на них
  wizardEyes.addEventListener('click', function (evt) {
    var nextColor = getNextColor(eyesInput.value, WIZARD_EYES_COLOR);
    evt.currentTarget.style.fill = nextColor;
    eyesInput.value = nextColor;
  });
})();
