import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddPropertyForm from '@/components/AddPropertyForm';

// Force dynamic rendering for add property page
export const dynamic = 'force-dynamic';

export default function AddPropertyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AddPropertyForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}