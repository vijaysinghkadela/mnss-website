// Server Component: Lists todos from Supabase example table
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const dynamic = 'force-dynamic'; // always fetch fresh

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
      }
    }
  });

  const { data, error } = await supabase.from('todos').select('*').order('inserted_at', { ascending: false }).limit(50);

  return (
    <main className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-bold mb-4">Todos (Supabase)</h1>
      {error && <div className="p-3 mb-4 text-sm bg-red-100 text-red-700 rounded">{error.message}</div>}
      <ul className="space-y-2">
        {(data || []).map(todo => (
          <li key={todo.id} className="p-3 bg-white rounded border flex items-center gap-3">
            <span className={`inline-block w-3 h-3 rounded-full ${todo.done ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span className={todo.done ? 'line-through text-gray-500' : ''}>{todo.title}</span>
          </li>
        ))}
        {!error && (!data || data.length === 0) && (
          <li className="text-sm text-gray-500">No todos yet. Insert one in Supabase dashboard or via the POST /api/todos endpoint.</li>
        )}
      </ul>
      <form action="/api/todos" method="POST" className="mt-8 flex gap-2">
        <input name="title" placeholder="New todo title" className="flex-1 border rounded px-3 py-2 text-sm" required />
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded text-sm">Add</button>
      </form>
      <p className="text-xs text-gray-400 mt-3">Demo list uses anon key. For protected data add auth + RLS.</p>
    </main>
  );
}
