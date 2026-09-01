const revealItems = [...document.querySelectorAll(
  '.card, .feature-grid article, .service-list article, .gallery img, .video-frame, .button, .hero img, .full-image'
)].filter((item) => !item.closest('.article-page'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => {
    item.classList.add('reveal');
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const navToggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');

if (navToggle && header) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-label', expanded ? '顯示選單' : '關閉選單');
    header.classList.toggle('open');
  });
}

const whatsAppButton = document.querySelector('.whatsapp-float');
const inlineWhatsAppButtons = document.querySelectorAll('a[href*="wa.me"]:not(.whatsapp-float)');

const updateWhatsAppOpacity = () => {
  if (!whatsAppButton) return;
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const nearBottom = scrollPosition >= pageHeight - 120;
  const hasVisibleInlineWhatsApp = [...inlineWhatsAppButtons].some((button) => {
    const rect = button.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  });

  whatsAppButton.classList.toggle('transparent', hasVisibleInlineWhatsApp);
  whatsAppButton.classList.toggle('dimmed', !hasVisibleInlineWhatsApp && nearBottom);
};

window.addEventListener('scroll', updateWhatsAppOpacity, { passive: true });
window.addEventListener('resize', updateWhatsAppOpacity, { passive: true });
updateWhatsAppOpacity();
