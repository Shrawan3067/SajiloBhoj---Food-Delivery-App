import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function CustomerHome(): JSX.Element {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  useEffect(() => {
    let mounted = true;
    api.get('/restaurants').then((res: any) => { if (mounted) setRestaurants(res.data || []); }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div key={r._id || r.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-500">{r.cuisine} • {r.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
