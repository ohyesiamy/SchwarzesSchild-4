import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../../lib/auth-middleware';
import { storage } from '../../lib/storage-instance';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = await verifyAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method === 'GET') {
    try {
      const settings = await storage.getSettingsByUserId(userId);
      res.json(settings);
    } catch (error) {
      console.error('Get settings error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const settings = await storage.updateSettings(userId, req.body);
      res.json(settings);
    } catch (error) {
      console.error('Update settings error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}