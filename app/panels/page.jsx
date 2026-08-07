import CategoryTemplate from '@/components/CategoryTemplate';
import { getCategoryById } from '@/data/categories';

const cat = getCategoryById('panels');

export const metadata = {
  title: 'Gypsum Panels & False Ceilings in Panchkula & Chandigarh',
  description: 'Gyproc gypsum boards, partition systems and false ceiling materials in stock at GT Building Solutions, Panchkula & Chandigarh.',
  alternates: { canonical: '/panels' },
};

export default function Page() {
  return <CategoryTemplate cat={cat} />;
}
