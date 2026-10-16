// Рендер блюд
function renderMenu(cat = 'all', search = '') {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    let list = MENU_DATA;
    if (cat !== 'all') list = list.filter(m => m.cat === cat);
    if (search) list = list.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
  
    grid.innerHTML = list.map(m => `
      <article class="menu-card reveal" data-id="${m.id}">
        ${m.badge ? `<span class="badge ${m.badge}">${m.badge === 'hot' ? 'Хит' : 'Новинка'}</span>` : ''}
        <div class="thumb"><span>${m.emoji}</span></div>
        <div class="body">
          <div class="cat">${m.catName}</div>
          <h3>${m.name}</h3>
          <p class="desc">${m.desc}</p>
          <div class="foot">
            <span class="price">${m.price} ₽</span>
            <span class="weight">${m.weight}</span>
          </div>
        </div>
      </article>
    `).join('');
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    grid.querySelectorAll('.menu-card').forEach(c =>
      c.addEventListener('click', () => openModal(c.dataset.id)));
  }
  
  // Рендер вин
  function renderWines() {
    const grid = document.getElementById('wineGrid');
    if (!grid) return;
    grid.innerHTML = WINES.map(w => `
      <article class="wine-card reveal in">
        <span class="wine-emo">${w.emoji}</span>
        <h3>${w.name}</h3>
        <div class="origin">${w.origin}</div>
        <p class="wine-desc">${w.desc}</p>
        <div class="wine-foot">
          <span class="price">${w.price} ₽</span>
          <span class="vol">${w.vol}</span>
        </div>
      </article>
    `).join('');
  }
  
  // Модалка
  function openModal(id) {
    const m = MENU_DATA.find(x => x.id == id);
    if (!m) return;
    const modal = document.getElementById('modal');
    modal.querySelector('.m-emo').textContent = m.emoji;
    modal.querySelector('.m-cat').textContent = m.catName;
    modal.querySelector('h3').textContent = m.name;
    modal.querySelector('.m-desc').textContent = m.desc;
    modal.querySelector('.m-price').textContent = m.price + ' ₽';
    modal.querySelector('.m-weight').textContent = m.weight;
    modal.classList.add('open');
    document.body.classList.add('locked');
  }
  function closeModal() {
    document.getElementById('modal')?.classList.remove('open');
    document.body.classList.remove('locked');
  }
  
  // Инициализация меню
  document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderWines();
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.cat);
      });
    });
    const search = document.getElementById('searchInput');
    search?.addEventListener('input', e => {
      const active = document.querySelector('.filter-btn.active')?.dataset.cat || 'all';
      renderMenu(active, e.target.value);
    });
    document.getElementById('modal')?.querySelector('.close')?.addEventListener('click', closeModal);
    document.getElementById('modal')?.querySelector('.modal-bg')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  });