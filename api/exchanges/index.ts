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
      const exchanges = await storage.getExchangesByUserId(userId);
      res.json(exchanges);
    } catch (error) {
      console.error('Get exchanges error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { fromCurrency, toCurrency, fromAmount, toAmount } = req.body;
      
      // Get all user accounts
      const accounts = await storage.getAccountsByUserId(userId);
      
      // Find the accounts for each currency
      const fromAccount = accounts.find(acc => acc.currency === fromCurrency);
      const toAccount = accounts.find(acc => acc.currency === toCurrency);
      
      if (!fromAccount) {
        return res.status(404).json({ error: `Account with currency ${fromCurrency} not found` });
      }
      
      if (!toAccount) {
        return res.status(404).json({ error: `Account with currency ${toCurrency} not found` });
      }
      
      // Check if there are sufficient funds
      if (fromAccount.balance < fromAmount) {
        return res.status(400).json({ error: "Insufficient funds for exchange" });
      }
      
      // Update from account (decrease balance)
      const newFromBalance = fromAccount.balance - fromAmount;
      await storage.updateAccountBalance(fromAccount.id, userId, newFromBalance);
      
      // Update to account (increase balance)
      const newToBalance = toAccount.balance + toAmount;
      await storage.updateAccountBalance(toAccount.id, userId, newToBalance);
      
      // Create exchange record
      const exchange = await storage.createExchange({
        ...req.body,
        userId,
      });
      
      res.status(201).json(exchange);
    } catch (error) {
      console.error('Create exchange error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}