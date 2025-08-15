import AdminDashboard from '@/components/AdminDashboard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
}