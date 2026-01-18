import React, { useEffect, useState } from 'react';
import api from '../services/api';

type User = any;

export default function AdminPanel(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    api.get('/admin/users')
      .then((res: any) => setUsers(res.data))
      .catch(console.error);
  }, []);
  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>All users</h3>
      {users.map((u: any) => (
        <div key={u._id}>{u.name} — {u.email} — {u.role}</div>
      ))}
    </div>
  );
}
