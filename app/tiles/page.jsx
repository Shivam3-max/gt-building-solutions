import CategoryTemplate from '@/components/CategoryTemplate';
import { getCategoryById } from '@/data/categories';

const cat = getCategoryById('tiles');

export const metadata = {
  title: 'Tiles & Sanitaryware in Panchkula & Chandigarh',
  description: 'Kajaria tiles, Hindware & Kerovit sanitaryware at our Gujarat Tiles & Sanitary Depot showroom in Chandigarh — GT Building Solutions.',
  alternates: { canonical: '/tiles' },
};

export default function Page() {
  return <CategoryTemplate cat={cat} />;
}
