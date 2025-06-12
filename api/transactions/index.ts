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
      const transactions = await storage.getTransactionsByUserId(userId);
      res.json(transactions);
    } catch (error) {
      console.error('Get transactions error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      // First get the account to update its balance
      const accountId = req.body.accountId;
      const amount = req.body.amount;
      
      // Get the current account
      const accounts = await storage.getAccountsByUserId(userId);
      const account = accounts.find(acc => acc.id === accountId);
      
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      
      // Calculate new balance based on transaction
      const newBalance = account.balance + amount;
      
      // Update the account balance
      await storage.updateAccountBalance(accountId, userId, newBalance);
      
      // Create the transaction record
      const transaction = await storage.createTransaction({
        ...req.body,
        userId,
      });
      
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Create transaction error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}