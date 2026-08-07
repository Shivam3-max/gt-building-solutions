import CategoryTemplate from '@/components/CategoryTemplate';
import { getCategoryById } from '@/data/categories';

const cat = getCategoryById('tools');

export const metadata = {
  title: 'Power Tools & Equipment in Panchkula & Chandigarh',
  description: 'DeWalt, CUMI & Havells power tools, grinders and site equipment in stock at GT Building Solutions, Panchkula & Chandigarh.',
  alternates: { canonical: '/power-tools' },
};

export default function Page() {
  return <CategoryTemplate cat={cat} />;
}
