import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WAB from '@/components/WAB';
import { SITE_URL } from '@/lib/site';

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
        rel="stylesheet"
      />
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WAB />
      </body>
    </html>
  );
}
