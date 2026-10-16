document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name');
      const date = fd.get('date');
      const time = fd.get('time');
      const guests = fd.get('guests');
      showToast(`${name}, ждём вас ${date} в ${time} (${guests} чел.) 🍷`);
      form.reset();
    });
  
    // Минимальная дата — сегодня
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
  });