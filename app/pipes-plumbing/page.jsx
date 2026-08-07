import CategoryTemplate from '@/components/CategoryTemplate';
import { getCategoryById } from '@/data/categories';

const cat = getCategoryById('pipes');

export const metadata = {
  title: 'Pipes & Plumbing Supplies in Panchkula & Chandigarh',
  description: 'Prince Piping CPVC/uPVC pipes, fittings and valves in stock at GT Building Solutions, Panchkula & Chandigarh.',
  alternates: { canonical: '/pipes-plumbing' },
};

export default function Page() {
  return <CategoryTemplate cat={cat} />;
}
