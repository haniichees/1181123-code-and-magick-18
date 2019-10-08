'use strict';

(function () {
  // ============================module3-task1=============================================
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
    for (var i = 0; i < window.data.QUANTITY; i++) {
      randomCharacteristic[i] = getRandCharacteristics(window.data.WIZARD_NAMES, window.data.WIZARD_SURNAME, window.data.WIZARD_COAT_COLOR, window.data.WIZARD_EYES_COLOR);
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
})();
