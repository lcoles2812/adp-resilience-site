// Scroll-progress rail — a thin fill on the left edge that tracks read progress.
(function () {
  var fill = document.getElementById('rail-fill');
  if (!fill) return;

  function update() {
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (scrolled / max) * 100 : 0;
    fill.style.height = pct + '%';
  }

  document.addEventListener('scroll', update, { passive: true });
  update();
})();
