(function () {
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var ctx = canvas.getContext("2d");
  var stars = [];
  var w, h, dpr;

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    var count = Math.round((w * h) / 9000);
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

  var t = 0;
  function draw() {
    t += 1;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var alpha = s.baseAlpha + Math.sin(t * s.speed + s.phase) * 0.25;
      if (alpha < 0) alpha = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(230, 233, 245," + alpha.toFixed(3) + ")";
      ctx.fill();

      s.y -= s.vy;
      if (s.y < -2) {
        s.y = h + 2;
        s.x = Math.random() * w;
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();
