import CategoryTemplate from '@/components/CategoryTemplate';
import { getCategoryById } from '@/data/categories';

const cat = getCategoryById('hardware');

export const metadata = {
  title: 'Kitchen & Furniture Hardware in Panchkula & Chandigarh',
  description: 'Hettich, Godrej, Sleek Kitchens & more — kitchen, furniture and door hardware in stock at GT Building Solutions, Panchkula & Chandigarh.',
  alternates: { canonical: '/hardware' },
};

export default function Page() {
  return <CategoryTemplate cat={cat} />;
}
