// Clock - It's time
// Javascript animation example
// (c) 2018 MK

var FirstRun = true;

function prepStuff() {
  window.setInterval('drawStuff()', 20);
}

function drawStuff() {
  var day = document.getElementById('day').getContext('2d');
  var hours = document.getElementById('hours').getContext('2d');
  var minutes = document.getElementById('minutes').getContext('2d');
  var seconds = document.getElementById('seconds').getContext('2d');

  var currTime = new Date();
  var prevTime = new Date(currTime.getTime() - 1000);

  // Effizienz stark verbessern
  if (FirstRun) {
    FirstRun = false;
    drawSeconds(currTime, seconds);
    drawMinutes(currTime, prevTime, minutes);
    drawHours(currTime, prevTime, hours);
    drawDays(currTime, day);
  } else {
    drawSeconds(currTime, seconds);
    if (currTime.getMinutes() - prevTime.getMinutes() > 0 || currTime.getMinutes() == 0) {
      drawMinutes(currTime, prevTime, minutes);
    }
    if (currTime.getHours() - prevTime.getHours() > 0 || currTime.getHours() == 0) {
      drawHours(currTime, prevTime, hours);
    }
    if (currTime.getDay() - prevTime.getDay() > 0 || currTime.getDay() == 0) {
      drawDays(currTime, day);
    }
  }

  function drawSeconds(currTime, ctx) {
    drawTime('seconds', currTime.getSeconds(), 60, ctx, currTime.getMilliseconds(), 1000, true);
  }

  function drawMinutes(currTime, prevTime, ctx) {
    var tmp = false;
    if (currTime.getMinutes() - prevTime.getMinutes() > 0 || currTime.getMinutes() == 0) {
      tmp = true;
    }
    drawTime('minutes', currTime.getMinutes(), 60, ctx, currTime.getMilliseconds(), 1000, tmp);
  }

  function drawHours(currTime, prevTime, ctx) {
    var tmp = false;
    if (currTime.getHours() - prevTime.getHours() > 0 || currTime.getHours() == 0) {
      tmp = true;
    }
    drawTime('hours', currTime.getHours(), 24, ctx, currTime.getMilliseconds(), 1000, tmp);
  }

  function drawDays(currTime, ctx) {
    // setup canvas
    var elem = document.getElementById('day');
    w = window.innerWidth;
    h = window.innerHeight;
    h = h * 0.25;
    w = w * 0.9;

    elem.width = w * 4;
    elem.height = h * 4;
    elem.style.width = w + "px";
    elem.style.height = h + "px";

    // determine weekday
    var weekday = new Array(7);
    weekday[0] = "Sonntag";
    weekday[1] = "Montag";
    weekday[2] = "Dienstag";
    weekday[3] = "Mittwoch";
    weekday[4] = "Donnerstag";
    weekday[5] = "Freitag";
    weekday[6] = "Samstag";
    // elem.innerText = weekday[currTime.getDay()];
    ctx.font = "" + h * 2 + "px Ubuntu";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.justifyContent = "center";
    ctx.fillText(weekday[currTime.getDay()], elem.width/2, elem.height/2 + h/2.5);
  }

  function drawTime(elem, unit, maxUnit, ctx, smaller, smallest, animate) {

    w = window.innerWidth;
    h = window.innerHeight;
    h = h * 0.25;
    w = w * 0.9;

    document.getElementById(elem).width = w * 2;
    document.getElementById(elem).height = h * 2;
    document.getElementById(elem).style.width = w + "px";
    document.getElementById(elem).style.height = h + "px";

    h *= 2;
    w *= 2;

    ctx.fillStyle = "#2f3b6d";
    ctx.fillRect(0, 0, w, h);

    for (var i = 0; i < unit; i++) {

      var status = 0;

      if (maxUnit == 60) {
        status = Math.ceil((i + 1) / 10) % 3;
      }

      if (maxUnit == 24) {
        status = Math.ceil((i + 1) / 4) % 3;
      }

      if (maxUnit == 7) {
        status = Math.ceil((i + 1) / 2) % 3;
      }

      if (status == 0) {
        ctx.fillStyle = "#F8E9A1";
      }
      if (status == 1) {
        ctx.fillStyle = "#F76C6C";
      }
      if (status == 2) {
        ctx.fillStyle = "#A8D0E6";
      }
      if (i == (unit - 1) && animate) {
        ctx.roundRect(w * ((maxUnit - i) / maxUnit) - w * (1 / maxUnit) * (1 - smaller / smallest) * 0.125, h * 0.25 - h * 0.2 * (smaller / smallest), -w * (1 / maxUnit) * (smaller / smallest) * 0.75, h * 0.5 + h * 0.4 * (smaller / smallest), 20).fill();
      } else {
        ctx.roundRect(w * ((maxUnit - i) / maxUnit), h * 0.05, -w * (1 / maxUnit) * 0.75, h * 0.9, 20).fill();
      }
    }
  }

}


// From Stackoverflow: https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (Math.abs(w) < 2 * r) r = Math.abs(w) / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
}
