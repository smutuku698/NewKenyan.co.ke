import type { Metadata } from 'next';
import AddRealEstateCompanyForm from './AddRealEstateCompanyForm';

export const metadata: Metadata = {
  title: 'Add Your Real Estate Company | NewKenyan.co.ke',
  description: 'List your real estate company on NewKenyan.co.ke and reach thousands of property buyers and sellers across Kenya. Free listing with premium features available.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AddCompanyPage() {
  return <AddRealEstateCompanyForm />;
}
