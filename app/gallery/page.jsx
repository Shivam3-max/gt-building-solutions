import { PageHero } from '@/components/Presentational';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata = {
  title: 'Photo Gallery — Products & Showrooms',
  description: 'Browse photos of GT Building Solutions’ products, brands, and showroom displays across Panchkula & Chandigarh.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag="Photo Gallery" title={'Our Products\n& Showrooms.'} sub="Browse our curated collection of products, installations, and showroom displays." />
      <GalleryGrid />
    </div>
  );
}
