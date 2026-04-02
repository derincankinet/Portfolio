document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-menu-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => panel.classList.toggle('is-open'));
  }

  document.querySelectorAll('[data-game-slider]').forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('[data-slide]'));
    const dots = Array.from(slider.querySelectorAll('[data-slide-dot]'));
    const prev = slider.querySelector('[data-slide-prev]');
    const next = slider.querySelector('[data-slide-next]');
    if (!slides.length) return;
    let index = 0;
    let interval;

    const syncVideos = () => {
      slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (!video) return;
        if (i === index) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    };

    const goTo = (newIndex) => {
      index = (newIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      syncVideos();
    };

    const restart = () => {
      clearInterval(interval);
      interval = setInterval(() => goTo(index + 1), 5000);
    };

    prev?.addEventListener('click', () => { goTo(index - 1); restart(); });
    next?.addEventListener('click', () => { goTo(index + 1); restart(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); restart(); }));

    goTo(0);
    restart();
  });
});
