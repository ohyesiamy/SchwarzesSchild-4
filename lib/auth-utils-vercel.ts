import { storage } from "./storage-instance";
import type { User as SelectUser, InsertUser } from "../shared/schema";

// Simple hash function for Vercel Edge Runtime
export async function hashPassword(password: string): Promise<string> {
  // For production, use a proper password hashing library compatible with Edge Runtime
  // This is a temporary implementation
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt-schwarzesschild');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const hashedSupplied = await hashPassword(supplied);
  return hashedSupplied === stored;
}

export async function getUser(id: number): Promise<SelectUser | undefined> {
  try {
    return await storage.getUser(id);
  } catch (error) {
    console.error('Error getting user:', error);
    return undefined;
  }
}

export async function getUserByUsername(username: string): Promise<SelectUser | undefined> {
  try {
    return await storage.getUserByUsername(username);
  } catch (error) {
    console.error('Error getting user by username:', error);
    return undefined;
  }
}

export async function createUser(user: InsertUser): Promise<SelectUser> {
  try {
    return await storage.createUser(user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function createDefaultAccountsAndSettings(userId: number) {
  try {
    // Create default accounts
    const accountPromises = [
      storage.createAccount({
        userId,
        name: "EUR Account",
        currency: "EUR",
        balance: 24856,
      }),
      storage.createAccount({
        userId,
        name: "USD Account",
        currency: "USD",
        balance: 12342,
      }),
      storage.createAccount({
        userId,
        name: "GBP Account",
        currency: "GBP",
        balance: 8761,
      }),
    ];
    
    const accounts = await Promise.all(accountPromises);
    
    // Create a default card
    await storage.createCard({
      userId,
      accountId: accounts[0].id, // First account (EUR)
      name: "Primary Card",
      cardNumber: "**** **** **** 4256",
      expiryDate: "12/25",
      spendingLimit: 5000,
    });
    
    // Create default settings
    await storage.createSettings({
      userId,
      twoFactorEnabled: true,
      pushNotificationsEnabled: true,
      transactionEmailsEnabled: true,
      marketingEnabled: false,
    });
  } catch (error) {
    console.error('Error creating default accounts and settings:', error);
    throw error;
  }
}