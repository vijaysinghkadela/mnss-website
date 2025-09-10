// Placeholder page: Supabase todos feature removed after migration to MongoDB.
// This route retained to avoid broken links; implement Mongo-backed todos if needed.
export default function TodosPage() {
  return (
    <main className="max-w-2xl mx-auto py-24 px-6">
      <h1 className="text-3xl font-bold mb-4">Todos Feature Removed</h1>
      <p className="text-gray-600 mb-6">
        The previous Supabase-based todos demo has been removed during the MongoDB migration.
        If you need a MongoDB-powered task list here, let me know and it can be added.
      </p>
      <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
        <li>No external Supabase SDK now required.</li>
        <li>Route kept for backward compatibility.</li>
        <li>Add a new collection (e.g. <code>todos</code>) and API route when ready.</li>
      </ul>
    </main>
  );
}
