import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../../../lib/auth-middleware';
import { storage } from '../../../lib/storage-instance';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = await verifyAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method === 'PATCH') {
    try {
      const cardId = parseInt(req.query.id as string);
      const card = await storage.updateCardFreezeStatus(
        cardId, 
        userId, 
        req.body.isFrozen
      );
      res.json(card);
    } catch (error) {
      console.error('Update card freeze status error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}