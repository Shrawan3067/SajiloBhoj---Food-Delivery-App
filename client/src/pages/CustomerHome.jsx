// client/src/pages/CustomerHome.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function CustomerHome() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    api.get('/restaurants').then(res => setRestaurants(res.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h2>Restaurants</h2>
      {restaurants.map(r => (
        <div key={r._id}>
          <h3>{r.name}</h3>
          <p>{r.cuisine} • {r.rating}</p>
        </div>
      ))}
    </div>
  );
}
