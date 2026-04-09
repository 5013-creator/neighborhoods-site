'use client';

import { useEffect, useState } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function CityPage({ params }) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [city, setCity] = useState('');

  const travelerTypes = ['All', 'First-timers', 'Families', 'Couples', 'Nightlife', 'Budget'];

  useEffect(() => {
    async function load() {
      const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);
      setCity(cityName);

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/neighborhoods?city=eq.${cityName}&select=*`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      const data = await response.json();
      setNeighborhoods(data);
    }
    load();
  }, []);

  const filtered = activeFilter === 'All'
    ? neighborhoods
    : neighborhoods.filter(n => n.best_for?.toLowerCase().includes(activeFilter.toLowerCase()));

  if (!city) return <p style={{ padding: '24px', fontFamily: 'sans-serif' }}>Loading...</p>;

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Best Neighborhoods in {city}</h1>
      <p style={{ color: '#555', marginBottom: '24px' }}>Find the right area for your trip.</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {travelerTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              border: '1px solid #ccc',
              backgroundColor: activeFilter === type ? '#222' : '#fff',
              color: activeFilter === type ? '#fff' : '#222',
              cursor: 'pointer',
              fontWeight: activeFilter === type ? '600' : '400'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {filtered.map(n => (
          <div key={n.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: '#fafafa'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>{n.neighborhood_name}</h2>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>{n.price_range}</span>
            </div>
            <p style={{ color: '#444', margin: '8px 0' }}>{n.vibe}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '10px 0' }}>
              {n.best_for?.split(',').map(tag => (
                <span key={tag} style={{
                  backgroundColor: '#eef2ff',
                  color: '#3730a3',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem'
                }}>{tag.trim()}</span>
              ))}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '10px' }}>
              <span>⭐ Safety: {n.safety_rating}</span>
              <span style={{ marginLeft: '16px' }}>🚇 Transit: {n.transit_access}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '8px' }}>
              📍 {n.top_attractions}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '48px',
        padding: '24px',
        backgroundColor: '#f0f4ff',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px' }}>
          Ready to book your stay in {city}?
        </p>
        
          href={`https://www.booking.com/searchresults.html?ss=${city}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#003580',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          See Hotels in {city}
        </a>
      </div>
    </main>
  );
}
