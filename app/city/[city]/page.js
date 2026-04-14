import CityClient from './CityClient';

export async function generateMetadata({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `Best Neighborhoods to Stay in ${city} — Where to Stay Guide`,
    description: `Discover the best neighborhoods in ${city} for first-timers, families, couples, nightlife and budget travelers.`,
  };
}

export default function CityPage({ params }) {
  return <CityClient params={params} />;
}
