const REVIEWS = [
    {name:"Магомед А.", date:"12 марта 2025", stars:5, text:"Хинкал даргинский — просто как у бабушки в Гунибе. Тесто тонкое, бульон наваристый. Обязательно вернусь снова!", dish:"Хинкал даргинский", avatar:"М"},
    {name:"Анна К.", date:"28 февраля 2025", stars:5, text:"Атмосфера невероятная — ковры, орнаменты, приглушённый свет. Чуду с тыквой — отдельная любовь ❤️", dish:"Чуду с тыквой", avatar:"А"},
    {name:"Ибрагим Ш.", date:"15 февраля 2025", stars:4, text:"Курзе лепят вручную, видно. Баранина мягкая. Единственное — хотелось бы побольше соуса.", dish:"Курзе", avatar:"И"},
    {name:"Елена М.", date:"8 февраля 2025", stars:5, text:"Впервые попробовала дагестанские вина. Дербентское красное — просто открытие! Сомелье подробно рассказал про каждый.", dish:"Дербентское красное", avatar:"Е"},
    {name:"Руслан Т.", date:"2 февраля 2025", stars:5, text:"Урбеч-десерт — это что-то космическое. Такого нигде больше не пробовал. Подача в национальном стиле.", dish:"Урбеч-десерт", avatar:"Р"},
    {name:"Ольга В.", date:"25 января 2025", stars:5, text:"Заказывали банкет — всё прошло идеально. Официанты ненавязчивы, еда приносилась горячей. Спасибо!", dish:"Банкет", avatar:"О"},
    {name:"Тимур Г.", date:"18 января 2025", stars:5, text:"Шурпа просто божественная. И хинкал-бульон, и ботишал — всё на высшем уровне. Настоящая дагестанская кухня.", dish:"Шурпа", avatar:"Т"},
    {name:"Светлана Р.", date:"10 января 2025", stars:4, text:"Очень вкусно, но в пятницу вечером сложно найти столик без брони. Бронируйте заранее!", dish:"Шашлык из баранины", avatar:"С"},
    {name:"Даниял Х.", date:"3 января 2025", stars:5, text:"Пахлава — свежайшая, чувствуется, что пекут тут же. Урбеч из абрикосовых косточек — идеален к чаю.", dish:"Пахлава", avatar:"Д"}
  ];
  
  function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    grid.innerHTML = REVIEWS.map(r => `
      <article class="review-card reveal in">
        <div class="review-head">
          <div class="review-avatar">${r.avatar}</div>
          <div>
            <div class="name">${r.name}</div>
            <div class="date">${r.date}</div>
          </div>
        </div>
        <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        <p class="text" style="margin-top:12px">${r.text}</p>
        ${r.dish ? `<span class="dish-tag">${r.dish}</span>` : ''}
      </article>
    `).join('');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
    const form = document.getElementById('reviewForm');
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      REVIEWS.unshift({
        name: fd.get('name'), date: new Date().toLocaleDateString('ru-RU'),
        stars: +fd.get('stars'), text: fd.get('text'),
        dish: fd.get('dish') || '', avatar: fd.get('name').charAt(0).toUpperCase()
      });
      renderReviews();
      form.reset();
      showToast('Спасибо за отзыв! ✨');
    });
  });