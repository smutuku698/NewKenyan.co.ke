import AddListingForm from '@/components/AddListingForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AddListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <AddListingForm />
      </main>
      <Footer />
    </div>
  );
}