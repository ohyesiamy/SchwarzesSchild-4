import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../../lib/auth-middleware';
import { storage } from '../../lib/storage-instance';
import { getUser } from '../../lib/auth-utils-vercel';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = await verifyAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const user = await getUser(userId);
    if (!user || user.username !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await storage.getAllUsersForAdmin();
    res.json(users);
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}