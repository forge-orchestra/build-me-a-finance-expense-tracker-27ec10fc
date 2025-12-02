import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import Cors from 'cors';
import { LucideIcon } from 'lucide-react';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

interface User {
  id: string;
  username: string;
  password: string;
}

const users: User[] = [
  { id: '1', username: 'user1', password: '$2a$10$7QJH6Z5sP1j1Y8eW6G9e0O' }, // hashed password
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = 'mocked-jwt-token'; // In real scenario, use a library to generate JWT
    return res.status(200).json({ token });
  }

  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is required' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = verify(token, 'secret'); // Replace 'secret' with your secret key
      return res.status(200).json({ user: decoded });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default handler;