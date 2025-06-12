import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage-instance";
import type { User as SelectUser, InsertUser } from "../shared/schema";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export async function getUser(id: number): Promise<SelectUser | undefined> {
  return storage.getUser(id);
}

export async function getUserByUsername(username: string): Promise<SelectUser | undefined> {
  return storage.getUserByUsername(username);
}

export async function createUser(user: InsertUser): Promise<SelectUser> {
  return storage.createUser(user);
}

export async function createDefaultAccountsAndSettings(userId: number) {
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
}