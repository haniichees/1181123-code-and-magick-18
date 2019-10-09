'use strict';

(function () {

  var QUANTITY = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // фунцкия, которая создает рандомного мага и добавляет его в массив
  function getRandomWizard(arr, count) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, count);
  }

  //  функция, которая создает DOM-элемент на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // функция отрисовки шаблона в документ
  var drawingTemplToDocument = function (wizard) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizard.length; i++) {
      fragment.appendChild(renderWizard(wizard[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.backend.load(function (wizards) {
    drawingTemplToDocument(getRandomWizard(wizards, QUANTITY));
    document.querySelector('.setup-similar').classList.remove('hidden');
  }, window.util.showError);

})();
