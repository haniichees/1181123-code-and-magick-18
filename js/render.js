'use strict';

(function () {
  var MAX_WIZARD_NUMBER = 4;
  var userDialog = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.renderWizards = function (data) {
    var fragment = document.createDocumentFragment();
    var wizardsCount = data.length > MAX_WIZARD_NUMBER ? MAX_WIZARD_NUMBER : data.length;
    similarListElement.innerHTML = '';

    for (var i = 0; i < wizardsCount; i++) {
      fragment.appendChild(createWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
})();

