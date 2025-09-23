// client/src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get('/admin/users').then(res => setUsers(res.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>All users</h3>
      {users.map(u => <div key={u._id}>{u.name} — {u.email} — {u.role}</div>)}
    </div>
  );
}
