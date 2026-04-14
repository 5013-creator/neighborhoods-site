import Link from 'next/link';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function Home() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/neighborhoods?city=neq.Chicago&select=city`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  // Count neighborhoods per city
  const cityCounts = {};
  for (const row of data) {
    if (!cityCounts[row.city]) cityCounts[row.city] = 0;
    cityCounts[row.city]++;
  }

  // Convert to sorted array — alphabetical for now
  const cities = Object.entries(cityCounts).map(([city, count]) => ({
    city,
    count,
    slug: city.toLowerCase().replace(/\s+/g, '-'),
  }));

  return (
    <main style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
      backgroundColor: '#ffffff',
    }}>
      <h1 style={{
        fontSize: '2rem',
        color: '#111',
        marginBottom: '8px',
      }}>
        Find the Best Neighborhood for Your Trip
      </h1>
      <p style={{
        color: '#555',
        fontSize: '1rem',
        marginBottom: '40px',
      }}>
        Honest, practical neighborhood guides — pick your city and find where to stay.
      </p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {cities.map(({ city, count, slug }) => (
          <Link
            key={city}
            href={`/city/${slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: '#fafafa',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.3rem',
                  color: '#111',
                  margin: '0 0 4px 0',
                }}>
                  {city}
                </h2>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  margin: 0,
                }}>
                  {count} neighborhood{count !== 1 ? 's' : ''}
                </p>
              </div>
              <span style={{
                backgroundColor: '#003580',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
              }}>
                Explore →
              </span>
            </div>
          </Link>
        ))}

        {cities.length === 0 && (
          <p style={{ color: '#555' }}>No cities available yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}
