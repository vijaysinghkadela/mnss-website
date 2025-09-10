import UploadSection from "@/components/UploadSection";
import ReportsSection from "@/components/ReportsSection";
import AdminSummary from '../../components/admin/AdminSummary';

export default function DashboardPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload your media and monitor processing status.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 col-span-2">
            <UploadSection />
            <ReportsSection />
          </div>
          <AdminSummary />
        </div>
      </div>
    </main>
  );
}
