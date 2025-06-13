import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

// Database types
interface User {
  id: number;
  username: string;
  password: string;
  fullname?: string;
  accountNumber?: string;
  memberSince?: Date;
}

// Simple hash function for Vercel Edge Runtime
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt-schwarzesschild');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const { username, password, fullname } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Check if user exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE username = ${username}
    `;
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create user
    const accountNumber = `SS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedPassword = await hashPassword(password);
    
    const [user] = await sql`
      INSERT INTO users (username, password, fullname, account_number, member_since)
      VALUES (${username}, ${hashedPassword}, ${fullname}, ${accountNumber}, ${new Date()})
      RETURNING id, username, fullname, account_number, member_since
    `;

    // Create default accounts
    const accountPromises = [
      sql`INSERT INTO accounts (user_id, name, currency, balance) VALUES (${user.id}, 'EUR Account', 'EUR', 24856)`,
      sql`INSERT INTO accounts (user_id, name, currency, balance) VALUES (${user.id}, 'USD Account', 'USD', 12342)`,
      sql`INSERT INTO accounts (user_id, name, currency, balance) VALUES (${user.id}, 'GBP Account', 'GBP', 8761)`,
    ];
    
    await Promise.all(accountPromises);

    // Get the first account for the card
    const [firstAccount] = await sql`
      SELECT id FROM accounts WHERE user_id = ${user.id} AND currency = 'EUR' LIMIT 1
    `;

    // Create a default card
    await sql`
      INSERT INTO cards (user_id, account_id, name, card_number, expiry_date, is_frozen, spending_limit)
      VALUES (${user.id}, ${firstAccount.id}, 'Primary Card', '**** **** **** 4256', '12/25', false, 5000)
    `;

    // Create default settings
    await sql`
      INSERT INTO settings (user_id, two_factor_enabled, push_notifications_enabled, transaction_emails_enabled, marketing_enabled)
      VALUES (${user.id}, true, true, true, false)
    `;

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'schwarzesschild_jwt_secret',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        accountNumber: user.account_number,
        memberSince: user.member_since
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}