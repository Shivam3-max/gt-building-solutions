// Pushes an event into GTM's dataLayer. No-ops on the server and when GTM
// isn't loaded (dataLayer just accumulates until GTM attaches, or is ignored
// entirely if GTM_ID is never set — see lib/site.js).
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
