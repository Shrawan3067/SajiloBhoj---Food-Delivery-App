import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export default function Signup(): JSX.Element {
  const { signup } = useAuth() as any;
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupForm>({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value } as SignupForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate('/login');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required />
        <select name="role" value={form.role} onChange={onChange}>
          <option value="customer">Customer</option>
          <option value="restaurant">Restaurant</option>
        </select>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
