(function () {
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  var w, h, dpr, cols, rows, values;
  var CELL = 9;

  var LINE = "230, 233, 245";
  var HILITE = "94, 234, 212";

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / CELL) + 1;
    rows = Math.ceil(h / CELL) + 1;
    values = new Float32Array(cols * rows);
  }

  // fast pseudo-random hash noise
  function hash(x, y) {
    var s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  }
  function smooth(t) {
    return t * t * (3 - 2 * t);
  }
  function valueNoise(x, y) {
    var xi = Math.floor(x), yi = Math.floor(y);
    var xf = x - xi, yf = y - yi;
    var v00 = hash(xi, yi), v10 = hash(xi + 1, yi);
    var v01 = hash(xi, yi + 1), v11 = hash(xi + 1, yi + 1);
    var u = smooth(xf), v = smooth(yf);
    var top = v00 * (1 - u) + v10 * u;
    var bottom = v01 * (1 - u) + v11 * u;
    return top * (1 - v) + bottom * v;
  }
  function fbm(x, y) {
    return valueNoise(x, y) * 0.85 + valueNoise(x * 2.1 + 40, y * 2.1 + 40) * 0.15;
  }

  function interp(va, vb, t) {
    if (Math.abs(va - vb) < 1e-6) return 0.5;
    var f = (t - va) / (vb - va);
    return Math.min(1, Math.max(0, f));
  }

  function marchLevel(threshold, strokeStyle, lineWidth, glow) {
    ctx.beginPath();
    for (var j = 0; j < rows - 1; j++) {
      for (var i = 0; i < cols - 1; i++) {
        var a = values[j * cols + i];
        var b = values[j * cols + i + 1];
        var c = values[(j + 1) * cols + i + 1];
        var d = values[(j + 1) * cols + i];
        var idx = 0;
        if (a >= threshold) idx |= 1;
        if (b >= threshold) idx |= 2;
        if (c >= threshold) idx |= 4;
        if (d >= threshold) idx |= 8;
        if (idx === 0 || idx === 15) continue;

        var x0 = i * CELL, y0 = j * CELL;
        var AB = [x0 + interp(a, b, threshold) * CELL, y0];
        var BC = [x0 + CELL, y0 + interp(b, c, threshold) * CELL];
        var DC = [x0 + interp(d, c, threshold) * CELL, y0 + CELL];
        var AD = [x0, y0 + interp(a, d, threshold) * CELL];

        switch (idx) {
          case 1: ctx.moveTo(AD[0], AD[1]); ctx.lineTo(DC[0], DC[1]); break;
          case 2: ctx.moveTo(DC[0], DC[1]); ctx.lineTo(BC[0], BC[1]); break;
          case 3: ctx.moveTo(AD[0], AD[1]); ctx.lineTo(BC[0], BC[1]); break;
          case 4: ctx.moveTo(AB[0], AB[1]); ctx.lineTo(BC[0], BC[1]); break;
          case 5:
            ctx.moveTo(AD[0], AD[1]); ctx.lineTo(AB[0], AB[1]);
            ctx.moveTo(DC[0], DC[1]); ctx.lineTo(BC[0], BC[1]);
            break;
          case 6: ctx.moveTo(AB[0], AB[1]); ctx.lineTo(DC[0], DC[1]); break;
          case 7: ctx.moveTo(AB[0], AB[1]); ctx.lineTo(AD[0], AD[1]); break;
          case 8: ctx.moveTo(AB[0], AB[1]); ctx.lineTo(AD[0], AD[1]); break;
          case 9: ctx.moveTo(AB[0], AB[1]); ctx.lineTo(DC[0], DC[1]); break;
          case 10:
            ctx.moveTo(AB[0], AB[1]); ctx.lineTo(BC[0], BC[1]);
            ctx.moveTo(AD[0], AD[1]); ctx.lineTo(DC[0], DC[1]);
            break;
          case 11: ctx.moveTo(AB[0], AB[1]); ctx.lineTo(BC[0], BC[1]); break;
          case 12: ctx.moveTo(AD[0], AD[1]); ctx.lineTo(BC[0], BC[1]); break;
          case 13: ctx.moveTo(DC[0], DC[1]); ctx.lineTo(BC[0], BC[1]); break;
          case 14: ctx.moveTo(AD[0], AD[1]); ctx.lineTo(DC[0], DC[1]); break;
        }
      }
    }
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    if (glow) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(" + HILITE + ", 0.65)";
    } else {
      ctx.shadowBlur = 0;
    }
    ctx.stroke();
  }

  var LEVELS = [0.18, 0.24, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.66, 0.72, 0.78, 0.84];
  var HILITE_LEVEL = 0.5;

  function frame(t) {
    var scroll = t * 0.00003;
    var freq = 0.022;
    var bias = 0.45;
    for (var j = 0; j < rows; j++) {
      var ny = j * freq;
      var warp = Math.sin(ny * 1.6 + scroll * 3) * 0.6 + Math.sin(ny * 0.6 - scroll * 2) * 0.35;
      for (var i = 0; i < cols; i++) {
        var nx = i * freq + warp + scroll * 4;
        var n = fbm(nx, ny);
        n += (j / rows) * bias - bias * 0.5;
        values[j * cols + i] = n;
      }
    }

    ctx.clearRect(0, 0, w, h);
    for (var k = 0; k < LEVELS.length; k++) {
      var lvl = LEVELS[k];
      var edgeFade = 1 - Math.abs(lvl - 0.5) * 1.5;
      var alpha = 0.1 + Math.max(0, edgeFade) * 0.12;
      marchLevel(lvl, "rgba(" + LINE + ", " + alpha.toFixed(3) + ")", 1, false);
    }
    marchLevel(HILITE_LEVEL, "rgba(" + HILITE + ", 0.55)", 1.4, true);

    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
