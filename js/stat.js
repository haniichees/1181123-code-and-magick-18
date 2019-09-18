'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_HEIGHT = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP;
var BAR_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var BAR_STEP = 50;
var BARSTEP_Y = 30;
var BAR_Y = CLOUD_Y + CLOUD_HEIGHT - BARSTEP_Y;

// функция для создания облака
function renderCloud(ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

// функция для отображения текста
function showText(ctx, txt, x, y, font, color) {
  ctx.fillStyle = color || '#000000';
  ctx.font = font || '16px PT Mono';
  ctx.fillText(txt, x, y);
}

// переменная, содержащая функцию для определения максимального времени
var getMaxTime = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', CLOUD_X + GAP, CLOUD_Y + GAP);
  renderCloud(ctx, '#fff', CLOUD_X, CLOUD_Y);

  showText(ctx, 'Ура вы победили!', 240, 30);
  showText(ctx, 'Список результатов:', 110, 60);

  var NAMEFIRST_X = CLOUD_X + FONT_GAP;
  var NAMESTEP_X = BAR_WIDTH + BAR_STEP;

  var maxTime = getMaxTime(times);

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomNumber = Math.floor((Math.random() * 100));
      ctx.fillStyle = 'hsl(240,' + randomNumber + '%, 50%)';

    }

    ctx.fillRect(NAMEFIRST_X + i * (NAMESTEP_X), BAR_Y, BAR_WIDTH, ((times[i] * HISTOGRAM_HEIGHT) / -maxTime));
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], NAMEFIRST_X + (NAMESTEP_X) * i, TEXT_HEIGHT);
    ctx.fillText(times[i].toFixed(0), NAMEFIRST_X + (NAMESTEP_X) * i, 245 - ((times[i] * HISTOGRAM_HEIGHT) / maxTime));
  }
};
