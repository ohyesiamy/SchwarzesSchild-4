import type { VercelRequest } from '@vercel/node';
import jwt from 'jsonwebtoken';

export async function verifyAuth(req: VercelRequest): Promise<number | null> {
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