const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const revealItems = document.querySelectorAll('[data-animate]');
const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const heroCard = document.querySelector('.hero-card');
const projectCards = document.querySelectorAll('.project-card');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.querySelector('.theme-toggle-label');
const themeIcon = document.querySelector('.theme-toggle-icon');

function applyTheme(theme) {
  document.body.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
  }

  if (themeLabel) {
    themeLabel.textContent = theme === 'light' ? 'Dark' : 'Light';
  }

  if (themeIcon) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

function closeMenu() {
  if (siteNav) {
    siteNav.classList.remove('show');
  }

  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('show');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

if ('IntersectionObserver' in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerRef.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if ('IntersectionObserver' in window && sectionLinks.length) {
  const sections = document.querySelectorAll('main section[id]');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (heroCard) {
  document.addEventListener('mousemove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroCard.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-4px)`;
  });

  document.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}

projectCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

const animatedElements = document.querySelectorAll('.skill-card, .stat-card, .about-list li');
animatedElements.forEach((element, index) => {
  element.animate(
    [
      { transform: 'translateY(10px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    {
      duration: 700,
      delay: index * 70,
      fill: 'forwards',
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    }
  );
});
