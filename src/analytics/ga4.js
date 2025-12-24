let initialized = false;

function getMeasurementId() {
  return import.meta.env.VITE_GA4_MEASUREMENT_ID || '';
}

function ensureGtagLoaded(measurementId) {
  if (!measurementId) return false;
  if (typeof window === 'undefined') return false;

  // If gtag already exists, assume script is loaded
  if (typeof window.gtag === 'function') return true;

  // Inject gtag.js once
  const existing = document.querySelector(`script[data-ga4="${measurementId}"]`);
  if (!existing) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      measurementId
    )}`;
    script.dataset.ga4 = measurementId;
    document.head.appendChild(script);
  }

  // Create the gtag function + dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  return true;
}

export function initGA4() {
  const measurementId = getMeasurementId();
  if (!measurementId || initialized) return;

  const ok = ensureGtagLoaded(measurementId);
  if (!ok) return;

  window.gtag('js', new Date());

  // Disable automatic page view; we’ll track route changes ourselves
  window.gtag('config', measurementId, { send_page_view: false });
  initialized = true;
}

export function trackPageView(path) {
  const measurementId = getMeasurementId();
  if (!measurementId) return;
  if (!initialized) initGA4();
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title
  });
}

export function trackEvent(name, params = {}) {
  const measurementId = getMeasurementId();
  if (!measurementId) return;
  if (!initialized) initGA4();
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', name, params);
}


