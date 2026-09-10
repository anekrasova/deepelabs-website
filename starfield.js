(function () {
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var ctx = canvas.getContext("2d");
  var stars = [];
  var w, h, dpr;

  var ACCENT = "124, 140, 255";
  var GLOW = "94, 234, 212";
  var STAR = "230, 233, 245";

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
  }

  function seedStars() {
    var count = Math.round((w * h) / 8000);
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.15 + 0.03,
        vy: Math.random() * 0.06 + 0.02
      });
    }
  }

  function drawStars(t) {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var alpha = s.baseAlpha + Math.sin(t * s.speed + s.phase) * 0.25;
      if (alpha < 0) alpha = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + STAR + "," + alpha.toFixed(3) + ")";
      ctx.fill();

      s.y -= s.vy;
      if (s.y < -2) {
        s.y = h + 2;
        s.x = Math.random() * w;
      }
    }
  }

  // perspective grid, floor fading toward a horizon line
  function drawGrid(t) {
    var horizonY = h * 0.62;
    var vanishX = w / 2;
    var floorTop = horizonY;
    var floorBottom = h + 40;
    var scroll = (t * 0.35) % 40;

    ctx.save();
    ctx.strokeStyle = "rgba(" + GLOW + ", 1)";
    ctx.lineWidth = 1;

    // horizontal lines, spaced to feel like they recede into the horizon
    var lineCount = 14;
    for (var i = 0; i < lineCount; i++) {
      var f = (i + scroll / 40) / lineCount;
      var y = floorTop + (floorBottom - floorTop) * (f * f);
      if (y > floorBottom) continue;
      var spread = 0.15 + f * 0.85;
      var xLeft = vanishX - (w * 0.6) * spread;
      var xRight = vanishX + (w * 0.6) * spread;
      ctx.globalAlpha = 0.55 * (1 - f) + 0.05;
      ctx.beginPath();
      ctx.moveTo(xLeft, y);
      ctx.lineTo(xRight, y);
      ctx.stroke();
    }

    // radiating verticals from the vanishing point
    var vCount = 9;
    ctx.strokeStyle = "rgba(" + ACCENT + ", 1)";
    ctx.globalAlpha = 0.22;
    for (var j = 0; j <= vCount; j++) {
      var fx = j / vCount;
      var xBottom = w * fx;
      ctx.beginPath();
      ctx.moveTo(vanishX, horizonY);
      ctx.lineTo(xBottom, floorBottom);
      ctx.stroke();
    }
    ctx.restore();
  }

  // rotating wireframe icosahedron, abstract centerpiece
  var PHI = (1 + Math.sqrt(5)) / 2;
  var RAW_VERTS = [
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
  ];
  var EDGES = [
    [0,1],[0,5],[0,7],[0,10],[0,11],
    [1,5],[1,7],[1,8],[1,9],
    [2,3],[2,4],[2,6],[2,10],[2,11],
    [3,4],[3,6],[3,8],[3,9],
    [4,5],[4,9],[4,11],
    [5,9],[5,11],
    [6,7],[6,8],[6,10],
    [7,8],[7,10],
    [8,9],
    [10,11]
  ];
  var vlen = Math.sqrt(1 + PHI * PHI);
  var VERTS = RAW_VERTS.map(function (v) {
    return [v[0] / vlen, v[1] / vlen, v[2] / vlen];
  });

  function rotateY(p, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
  }
  function rotateX(p, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
  }

  function drawSolid(t) {
    var cx = w * 0.5;
    var cy = h * 0.42;
    var radius = Math.min(w, h) * 0.22;
    var ay = t * 0.0016;
    var ax = 0.5 + Math.sin(t * 0.0009) * 0.18;

    var projected = VERTS.map(function (v) {
      var p = rotateY(v, ay);
      p = rotateX(p, ax);
      var perspective = 2.6 / (2.6 + p[2]);
      return {
        x: cx + p[0] * radius * perspective,
        y: cy + p[1] * radius * perspective,
        z: p[2]
      };
    });

    ctx.save();
    ctx.lineWidth = 1;
    ctx.shadowBlur = 14;
    ctx.shadowColor = "rgba(" + GLOW + ", 0.5)";
    for (var i = 0; i < EDGES.length; i++) {
      var a = projected[EDGES[i][0]];
      var b = projected[EDGES[i][1]];
      var depthAlpha = 0.15 + (1 - (a.z + b.z) / 4) * 0.18;
      ctx.strokeStyle = "rgba(" + ACCENT + ", " + depthAlpha.toFixed(3) + ")";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    for (var j = 0; j < projected.length; j++) {
      var pt = projected[j];
      var da = 0.35 + (1 - (pt.z + 1) / 2) * 0.4;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + GLOW + ", " + da.toFixed(3) + ")";
      ctx.fill();
    }
    ctx.restore();
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    drawGrid(t);
    drawStars(t);
    drawSolid(t);
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
