// Recipe library — renders RECIPES (assets/recipes-data.js) into cards and
// wires up the category filter tabs.
(function () {
  var grid = document.getElementById('recipe-grid');
  if (!grid || typeof RECIPES === 'undefined') return;

  var countEl = document.getElementById('recipe-count');
  var filters = document.querySelectorAll('.recipe-filter');

  var PLACEHOLDER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 3v7a2 2 0 002 2v9M7 3v7M9 3v7M11 3v7" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 3c-1.5 0-2.5 1.8-2.5 5s1 5 2.5 5v8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var SOURCE_LABEL = { adp: 'ADP Resilience', ct: 'Common Table Kitchen' };

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function macroRow(r) {
    var parts = [];
    if (r.protein) parts.push('<span><strong>' + esc(r.protein) + '</strong> protein</span>');
    if (r.carbs) parts.push('<span><strong>' + esc(r.carbs) + '</strong> carbs</span>');
    if (r.fat) parts.push('<span><strong>' + esc(r.fat) + '</strong> fat</span>');
    return parts.join('');
  }

  function card(r) {
    var photo = r.image
      ? '<img src="' + esc(r.image) + '" alt="' + esc(r.title) + '" loading="lazy">'
      : PLACEHOLDER_ICON;
    var photoClass = 'recipe-photo' + (r.image ? '' : ' placeholder');

    var ingredients = r.ingredients.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('');
    var method = r.method.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('');
    var link = r.link
      ? '<a class="recipe-source-link" href="' + esc(r.link) + '" target="_blank" rel="noopener">View full recipe on Common Table Kitchen →</a>'
      : '';
    var time = r.time ? '<span class="recipe-time">' + esc(r.time) + '</span>' : '';

    return (
      '<article class="recipe-card" data-category="' + esc(r.category) + '">' +
        '<div class="' + photoClass + '">' + photo + '</div>' +
        '<div class="recipe-body">' +
          '<div class="recipe-top">' +
            '<span class="recipe-source ' + esc(r.source) + '">' + esc(SOURCE_LABEL[r.source] || '') + '</span>' +
            '<span class="recipe-cal">' + esc(r.calories) + ' kcal</span>' +
          '</div>' +
          '<h3>' + esc(r.title) + '</h3>' +
          '<div class="recipe-macros">' + macroRow(r) + '</div>' +
          time +
          '<details class="recipe-details">' +
            '<summary>Ingredients &amp; method<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg></summary>' +
            '<div class="recipe-expand">' +
              '<h4>Ingredients</h4><ul>' + ingredients + '</ul>' +
              '<h4>Method</h4><ol>' + method + '</ol>' +
              link +
            '</div>' +
          '</details>' +
        '</div>' +
      '</article>'
    );
  }

  function render(filter) {
    var list = filter === 'all' ? RECIPES : RECIPES.filter(function (r) { return r.category === filter; });
    grid.innerHTML = list.length
      ? list.map(card).join('')
      : '<p class="recipe-empty">No recipes in this category yet.</p>';
    if (countEl) {
      countEl.textContent = list.length + (list.length === 1 ? ' recipe' : ' recipes');
    }
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      render(btn.getAttribute('data-filter'));
    });
  });

  render('all');
})();
