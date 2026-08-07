import { PageHero } from '@/components/Presentational';
import BrandsGrid from '@/components/BrandsGrid';

export const metadata = {
  title: '30+ Brand Partners in Panchkula & Chandigarh',
  description: 'Kajaria, Havells, Dr. Fixit, Asian Paints & 25+ more — every brand GT Building Solutions stocks across Panchkula & Chandigarh.',
  alternates: { canonical: '/brands' },
};

export default function BrandsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag="Our Brand Portfolio" title={'30+ Premium Brands.\nAll Under One Roof.'} sub="Every product genuine and stocked at our stores." />
      <BrandsGrid />
    </div>
  );
}
