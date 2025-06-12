import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../../lib/auth-middleware';
import { getUser } from '../../lib/auth-utils-vercel';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await getUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}