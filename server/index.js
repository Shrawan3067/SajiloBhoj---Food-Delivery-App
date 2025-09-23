// server/index.js (ESM style)
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'change_this_secret';
const fakeDB = { users: [], restaurants: [{ _id:'r1', name:'A Cafe', cuisine:'Nepalese', rating:4.4 }] };

// signup
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name, role='customer' } = req.body;
  if (fakeDB.users.find(u => u.email === email)) return res.status(400).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = { _id: String(fakeDB.users.length + 1), name, email, password: hash, role };
  fakeDB.users.push(user);
  res.json({ message: 'ok' });
});

// login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = fakeDB.users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ _id: user._id, role: user.role, name: user.name, email: user.email }, SECRET, { expiresIn: '7d' });
  const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role };
  res.json({ token, user: safeUser });
});

// admin route
app.get('/api/admin/users', (req, res) => {
  const auth = req.headers.authorization?.split(' ')[1];
  try {
    const payload = jwt.verify(auth, SECRET);
    if (payload.role !== 'admin') return res.status(403).json({ message: 'forbidden' });
    const users = fakeDB.users.map(u => ({ _id:u._id, name:u.name, email:u.email, role:u.role }));
    return res.json(users);
  } catch (err) {
    return res.status(401).json({ message: 'unauthorized' });
  }
});

// restaurants (public)
app.get('/api/restaurants', (req, res) => {
  res.json(fakeDB.restaurants);
});

// healthcheck
app.get('/api/ping', (req, res) => res.json({ message: 'pong' }));

const PORT = 5000;
app.listen(PORT, () => console.log('Server listening on', PORT));
