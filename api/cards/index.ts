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
      const cards = await storage.getCardsByUserId(userId);
      res.json(cards);
    } catch (error) {
      console.error('Get cards error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const card = await storage.createCard({
        ...req.body,
        userId,
      });
      res.status(201).json(card);
    } catch (error) {
      console.error('Create card error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}