(() => {
  const player = document.querySelector('[data-app-video]');
  if (!player) return;

  const viewport = player.querySelector('[data-app-video-viewport]');
  const placeholder = player.querySelector('[data-app-video-placeholder]');
  const errorMessage = player.querySelector('[data-app-video-error]');
  const retryButton = player.querySelector('[data-app-video-retry]');
  if (!viewport || !placeholder || !errorMessage || !retryButton) return;

  let iframe = null;
  let timeoutId = 0;
  let isReady = false;

  const showRetry = () => {
    if (!isReady) errorMessage.hidden = false;
  };

  const mountDemo = () => {
    if (iframe) return;
    errorMessage.hidden = true;
    iframe = document.createElement('iframe');
    iframe.className = 'app-video-iframe';
    iframe.title = 'Animated preview of a TechStack Sydney web and mobile app';
    iframe.src = '/app-video-demo/index.html';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    viewport.appendChild(iframe);
    timeoutId = window.setTimeout(showRetry, 15000);
  };

  const onReady = (event) => {
    if (
      !iframe ||
      event.origin !== window.location.origin ||
      event.source !== iframe.contentWindow ||
      !event.data ||
      event.data.type !== 'tss-app-video-ready'
    ) return;

    isReady = true;
    window.clearTimeout(timeoutId);
    errorMessage.hidden = true;
    player.classList.add('is-ready');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => placeholder.remove(), reducedMotion ? 0 : 280);
  };

  window.addEventListener('message', onReady);

  retryButton.addEventListener('click', () => {
    if (iframe) iframe.remove();
    iframe = null;
    isReady = false;
    window.clearTimeout(timeoutId);
    player.classList.remove('is-ready');
    placeholder.hidden = false;
    placeholder.style.opacity = '';
    mountDemo();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      mountDemo();
    }, { rootMargin: '450px 0px' });
    observer.observe(player);
  } else if (document.readyState === 'complete') {
    mountDemo();
  } else {
    window.addEventListener('load', mountDemo, { once: true });
  }
})();
