import { supabase } from '../lib/supabase'

export default async function Home() {
  const { data: neighborhoods } = await supabase
    .from('neighborhoods')
    .select('*')
    .eq('city', 'Chicago')

  return (
    <main>
      <h1>Best Neighborhoods to Stay in Chicago</h1>
      {neighborhoods?.map((n) => (
        <div key={n.id}>
          <h2>{n.neighborhood_name}</h2>
          <p>{n.vibe}</p>
        </div>
      ))}
    </main>
  )
}
