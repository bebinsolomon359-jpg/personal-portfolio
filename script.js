const yearElement = document.getElementById('year');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const sections = Array.from(document.querySelectorAll('section[id]'));

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function setActiveNav(targetId) {
  siteNav?.querySelectorAll('a').forEach((link) => {
    const isActive = link.getAttribute('href') === `#${targetId}`;
    link.classList.toggle('active', isActive);
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (sections.length && siteNav) {
  const navLinks = Array.from(siteNav.querySelectorAll('a'));

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;
      setActiveNav(visibleEntry.target.id);
    },
    {
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.2, 0.4, 0.6],
    }
  );

  sections.forEach((section) => observer.observe(section));

  navLinks.forEach((link) => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    if (!targetId) return;
    if (targetId === 'home' && !window.location.hash) {
      setActiveNav('home');
    }
  });
}
