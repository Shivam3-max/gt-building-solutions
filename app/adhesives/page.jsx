import CategoryTemplate from '@/components/CategoryTemplate';
import { getCategoryById } from '@/data/categories';

const cat = getCategoryById('adhesives');

export const metadata = {
  title: 'Adhesives & Waterproofing in Panchkula & Chandigarh',
  description: 'Fevicol, Dr. Fixit, Roff, Pidilite & 3M — tile adhesives, waterproofing and construction chemicals at GT Building Solutions.',
  alternates: { canonical: '/adhesives' },
};

export default function Page() {
  return <CategoryTemplate cat={cat} />;
}
