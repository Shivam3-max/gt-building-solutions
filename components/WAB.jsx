'use client';
import { STORES, WHATSAPP_LINK, PANCHKULA_MAPS_LINK } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export default function WAB() {
  return (
    <div className="fixed bottom-7 right-7 z-[999] flex flex-col items-center gap-3">
      <a
        href={PANCHKULA_MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('location_click', { location: 'floating_button_panchkula' })}
        aria-label={`Open ${STORES.panchkula.name} location in Google Maps`}
        className="floating-cta floating-cta--location w-[54px] h-[54px] rounded-full text-white flex items-center justify-center no-underline"
        style={{
          background: 'linear-gradient(135deg, #E65A4F 0%, #C83A2F 100%)',
          boxShadow: '0 6px 28px rgba(200,58,47,0.38)',
        }}
      >
        <span className="floating-cta__icon">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M12 2.25a6.75 6.75 0 0 0-6.75 6.75c0 4.84 5.2 10.52 6.12 11.48a.9.9 0 0 0 1.26 0c.92-.96 6.12-6.64 6.12-11.48A6.75 6.75 0 0 0 12 2.25Zm0 9.5A2.75 2.75 0 1 1 12 6.25a2.75 2.75 0 0 1 0 5.5Z" />
          </svg>
        </span>
      </a>
      <a
        href={`${WHATSAPP_LINK}?text=Hello%20GT%20Building%20Solutions!%20I%20need%20assistance.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
        aria-label="Chat with us on WhatsApp"
        className="floating-cta floating-cta--whatsapp w-[58px] h-[58px] bg-[#25D366] rounded-full text-white flex items-center justify-center no-underline"
      >
        <span className="floating-cta__icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.96 1.25 2.24 1.39.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.26.36-.22.6-.13.24.09 1.55.73 1.82.86.26.13.44.19.5.3.07.11.07.62-.17 1.3Z"/></svg>
        </span>
      </a>
    </div>
  );
}
