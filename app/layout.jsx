import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WAB from '@/components/WAB';
import { SITE_URL, GTM_ID } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GT Building Solutions — 30+ Brand Building Materials Showroom | Panchkula & Chandigarh',
    template: '%s | GT Building Solutions',
  },
  description:
    "Garg Trading Company (GT Building Solutions) — Panchkula & Chandigarh's one-stop supplier for hardware, tiles, paints, panels, pipes, adhesives, and tools from 30+ premium brands.",
  icons: {
    icon: '/Public/Logo.png',
    apple: '/Public/Logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'GT Building Solutions',
    title: 'GT Building Solutions — All Building Solutions Under One Roof',
    description: "Panchkula & Chandigarh's one-stop supplier for hardware, tiles, paints, panels, pipes, adhesives, and tools from 30+ premium brands.",
    images: ['/Public/client/hero-poster.jpg'],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  // Google Search Console verification. Set NEXT_PUBLIC_GSC_VERIFICATION to
  // the token GSC gives you for the HTML-tag verification method, then
  // rebuild — omitted entirely (no empty meta tag) until then.
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
        rel="stylesheet"
      />
      {GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      )}
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Nav />
        <main>{children}</main>
        <Footer />
        <WAB />
      </body>
    </html>
  );
}
