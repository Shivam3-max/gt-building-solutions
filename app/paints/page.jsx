import CategoryTemplate from '@/components/CategoryTemplate';
import { getCategoryById } from '@/data/categories';

const cat = getCategoryById('paints');

export const metadata = {
  title: 'Paints & Coatings in Panchkula & Chandigarh',
  description: 'Asian Paints, Birla Opus, Nippon Paint & more — interior, exterior and wood finish paints at GT Building Solutions.',
  alternates: { canonical: '/paints' },
};

export default function Page() {
  return <CategoryTemplate cat={cat} />;
}
