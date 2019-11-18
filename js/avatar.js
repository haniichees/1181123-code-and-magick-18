'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('[name = "avatar"]');
  var avatarPreview = document.querySelector('.setup-user-pic');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
