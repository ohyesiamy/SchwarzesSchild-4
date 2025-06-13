import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

async function verifyAuth(req: VercelRequest): Promise<number | null> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'schwarzesschild_jwt_secret'
    ) as { id: number; username: string };

    return decoded.id;
  } catch (error) {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Get user by ID
    const users = await sql`
      SELECT id, username, fullname, account_number, member_since 
      FROM users 
      WHERE id = ${userId}
    `;

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    res.status(200).json({
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      accountNumber: user.account_number,
      memberSince: user.member_since
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}