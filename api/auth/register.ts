import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserByUsername, hashPassword, createUser, createDefaultAccountsAndSettings } from '../../lib/auth-utils-vercel';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password, fullname } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await createUser({
      username,
      password: await hashPassword(password),
      fullname
    });

    // Create default accounts and settings
    await createDefaultAccountsAndSettings(user.id);

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'schwarzesschild_jwt_secret',
      { expiresIn: '30d' }
    );

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}