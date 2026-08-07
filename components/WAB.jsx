import { WHATSAPP_LINK } from '@/lib/site';

export default function WAB() {
  return (
    <a
      href={`${WHATSAPP_LINK}?text=Hello%20GT%20Building%20Solutions!%20I%20need%20assistance.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-7 right-7 z-[999] w-[58px] h-[58px] bg-[#25D366] rounded-full text-white flex items-center justify-center no-underline hover:scale-110 transition-transform"
      style={{ animation: 'pulse 2.2s ease-in-out infinite' }}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.96 1.25 2.24 1.39.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.26.36-.22.6-.13.24.09 1.55.73 1.82.86.26.13.44.19.5.3.07.11.07.62-.17 1.3Z"/></svg>
    </a>
  );
}
