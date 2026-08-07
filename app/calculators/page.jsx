import { PageHero } from '@/components/Presentational';
import CalculatorsHub from '@/components/CalculatorsHub';

export const metadata = {
  title: 'Free Building Material Calculators',
  description: 'Free tile, paint, adhesive and budget calculators for your renovation or construction project — from GT Building Solutions.',
  alternates: { canonical: '/calculators' },
};

export default function CalculatorsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag="Professional Tools" title={'Industry Tools\nfor Smarter Projects.'} sub="Free estimation tools designed for architects, contractors, and homeowners." />
      <CalculatorsHub />
    </div>
  );
}
