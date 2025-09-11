import UploadSection from "@/components/UploadSection";
import ReportsSection from "@/components/ReportsSection";

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

        <div className="flex flex-col items-start justify-center gap-8 lg:flex-row">
          <UploadSection />
          <ReportsSection />
        </div>
      </div>
    </main>
  );
}
