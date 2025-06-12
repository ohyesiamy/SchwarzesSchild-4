import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../../lib/auth-middleware';
import { storage } from '../../lib/storage-instance';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = await verifyAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const accountId = parseInt(req.query.id as string);

  if (req.method === 'PATCH') {
    try {
      const { balance } = req.body;
      
      const updatedAccount = await storage.updateAccountBalance(
        accountId,
        userId,
        balance
      );
      
      res.json(updatedAccount);
    } catch (error) {
      console.error('Update account error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}