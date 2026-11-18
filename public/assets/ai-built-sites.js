(() => {
  const hero = document.querySelector('[data-ai-sites-hero]');
  if (!hero) return;
  const compact = matchMedia('(max-width: 1024px)');
  const showHero = () => {
    const view = compact.matches ? 'static' : 'index.html';
    hero.src = '/ai-built-sites-preview/' + view;
  };
  compact.addEventListener('change', showHero);
  showHero();
})();
