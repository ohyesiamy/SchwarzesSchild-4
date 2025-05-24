import {
  User,
  InsertUser,
  Account,
  Transaction,
  Card,
  Exchange,
  Settings,
  users,
  accounts,
  transactions,
  cards,
  exchanges,
  settings
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";
import { IStorage } from "./storage";

// PostgreSQL session store
const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'session'
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const accountNumber = `SS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        accountNumber,
        memberSince: new Date(),
        phone: null
      })
      .returning();
    return user;
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return await db.select().from(accounts).where(eq(accounts.userId, userId));
  }

  async createAccount(account: Omit<Account, "id">): Promise<Account> {
    const [newAccount] = await db
      .insert(accounts)
      .values(account)
      .returning();
    return newAccount;
  }
  
  async updateAccountBalance(accountId: number, userId: number, balance: number): Promise<Account> {
    // First check if the account belongs to the user
    const [account] = await db
      .select()
      .from(accounts)
      .where(and(
        eq(accounts.id, accountId),
        eq(accounts.userId, userId)
      ));
    
    if (!account) {
      throw new Error("Account not found or unauthorized");
    }
    
    // Update the account balance
    const [updatedAccount] = await db
      .update(accounts)
      .set({ balance })
      .where(eq(accounts.id, accountId))
      .returning();
    
    return updatedAccount;
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.userId, userId));
  }

  async createTransaction(transaction: Omit<Transaction, "id" | "date">): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values({
        ...transaction,
        date: new Date()
      })
      .returning();
    return newTransaction;
  }

  async getCardsByUserId(userId: number): Promise<Card[]> {
    return await db.select().from(cards).where(eq(cards.userId, userId));
  }

  async createCard(card: Omit<Card, "id" | "isFrozen">): Promise<Card> {
    const [newCard] = await db
      .insert(cards)
      .values({
        ...card,
        isFrozen: false,
        spendingLimit: card.spendingLimit || null
      })
      .returning();
    return newCard;
  }

  async updateCardFreezeStatus(cardId: number, userId: number, isFrozen: boolean): Promise<Card> {
    const [card] = await db
      .select()
      .from(cards)
      .where(and(
        eq(cards.id, cardId),
        eq(cards.userId, userId)
      ));
    
    if (!card) {
      throw new Error("Card not found");
    }
    
    const [updatedCard] = await db
      .update(cards)
      .set({ isFrozen })
      .where(eq(cards.id, cardId))
      .returning();
    
    return updatedCard;
  }

  async getExchangesByUserId(userId: number): Promise<Exchange[]> {
    return await db.select().from(exchanges).where(eq(exchanges.userId, userId));
  }
  
  async createExchange(exchange: Omit<Exchange, "id" | "date">): Promise<Exchange> {
    const [newExchange] = await db
      .insert(exchanges)
      .values({
        ...exchange,
        date: new Date()
      })
      .returning();
    return newExchange;
  }

  async getSettingsByUserId(userId: number): Promise<Settings | undefined> {
    const [setting] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, userId));
    return setting;
  }
  
  async createSettings(settingsData: Omit<Settings, "id">): Promise<Settings> {
    const [newSettings] = await db
      .insert(settings)
      .values(settingsData)
      .returning();
    return newSettings;
  }
  
  async updateSettings(userId: number, settingsUpdate: Partial<Settings>): Promise<Settings> {
    const [existingSettings] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, userId));
    
    if (!existingSettings) {
      throw new Error("Settings not found");
    }
    
    const [updatedSettings] = await db
      .update(settings)
      .set(settingsUpdate)
      .where(eq(settings.userId, userId))
      .returning();
    
    return updatedSettings;
  }
}