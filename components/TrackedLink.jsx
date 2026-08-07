'use client';
import { trackEvent } from '@/lib/analytics';

// Plain <a> wrapper that fires a GTM dataLayer event on click before/while
// navigating. Lets server-component pages (which can't attach onClick to a
// native DOM element) still track conversion clicks without becoming client
// components themselves.
export default function TrackedLink({ href, event, eventParams, onClick, children, ...rest }) {
  const handleClick = (e) => {
    trackEvent(event, eventParams);
    if (onClick) onClick(e);
  };
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
