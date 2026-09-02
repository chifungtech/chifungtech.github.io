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

const navItems = document.querySelectorAll('.nav-item');

const syncMobileNavLinks = () => {
  navItems.forEach((item) => {
    const menuLink = item.querySelector('.nav-link');
    if (!menuLink) return;

    if (window.innerWidth <= 800) {
      if (menuLink.getAttribute('href') !== '#') {
        menuLink.dataset.desktopHref = menuLink.getAttribute('href');
        menuLink.setAttribute('href', '#');
      }
    } else if (menuLink.dataset.desktopHref) {
      menuLink.setAttribute('href', menuLink.dataset.desktopHref);
    }
  });
};

navItems.forEach((item) => {
  const menuLink = item.querySelector('.nav-link');
  let closeTimer;

  const closeMenu = () => {
    item.classList.remove('open');
    if (menuLink) {
      menuLink.setAttribute('aria-expanded', 'false');
    }
  };

  const openMenu = () => {
    navItems.forEach((navItem) => {
      navItem.classList.remove('open');
      const navLink = navItem.querySelector('.nav-link');
      if (navLink) {
        navLink.setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.add('open');
    if (menuLink) {
      menuLink.setAttribute('aria-expanded', 'true');
    }
  };

  item.addEventListener('mouseenter', () => {
    if (window.innerWidth > 800) {
      window.clearTimeout(closeTimer);
      openMenu();
    }
  });

  item.addEventListener('mouseleave', () => {
    if (window.innerWidth > 800) {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(closeMenu, 150);
    }
  });

  item.addEventListener('focusin', () => {
    if (window.innerWidth > 800) {
      openMenu();
    }
  });

  item.addEventListener('focusout', (event) => {
    if (window.innerWidth > 800 && !item.contains(event.relatedTarget)) {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(closeMenu, 150);
    }
  });

  if (menuLink) {
    menuLink.setAttribute('aria-expanded', 'false');

    menuLink.addEventListener('click', (event) => {
      if (window.innerWidth <= 800) {
        event.preventDefault();
        event.stopPropagation();
        const isOpen = item.classList.contains('open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
        return false;
      }
    });
  }
});

syncMobileNavLinks();
window.addEventListener('resize', syncMobileNavLinks);

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
