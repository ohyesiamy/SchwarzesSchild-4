import {
  User,
  InsertUser,
  Account,
  Transaction,
  Card,
  Exchange,
  Settings,
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Account operations
  getAccountsByUserId(userId: number): Promise<Account[]>;
  createAccount(account: Omit<Account, "id">): Promise<Account>;
  
  // Transaction operations
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: Omit<Transaction, "id" | "date">): Promise<Transaction>;
  
  // Card operations
  getCardsByUserId(userId: number): Promise<Card[]>;
  createCard(card: Omit<Card, "id" | "isFrozen">): Promise<Card>;
  updateCardFreezeStatus(cardId: number, userId: number, isFrozen: boolean): Promise<Card>;
  
  // Exchange operations
  getExchangesByUserId(userId: number): Promise<Exchange[]>;
  createExchange(exchange: Omit<Exchange, "id" | "date">): Promise<Exchange>;
  
  // Settings operations
  getSettingsByUserId(userId: number): Promise<Settings | undefined>;
  createSettings(settings: Omit<Settings, "id">): Promise<Settings>;
  updateSettings(userId: number, settings: Partial<Settings>): Promise<Settings>;
  
  // Session store
  sessionStore: any;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private accounts: Map<number, Account>;
  private transactions: Map<number, Transaction>;
  private cards: Map<number, Card>;
  private exchanges: Map<number, Exchange>;
  private settings: Map<number, Settings>;
  sessionStore: any;
  
  private userIdCounter: number;
  private accountIdCounter: number;
  private transactionIdCounter: number;
  private cardIdCounter: number;
  private exchangeIdCounter: number;
  private settingsIdCounter: number;

  constructor() {
    this.users = new Map();
    this.accounts = new Map();
    this.transactions = new Map();
    this.cards = new Map();
    this.exchanges = new Map();
    this.settings = new Map();
    
    this.userIdCounter = 1;
    this.accountIdCounter = 1;
    this.transactionIdCounter = 1;
    this.cardIdCounter = 1;
    this.exchangeIdCounter = 1;
    this.settingsIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const accountNumber = `SS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      fullname: insertUser.fullname || null,
      accountNumber,
      memberSince: new Date(),
      phone: null,
    };
    
    this.users.set(id, user);
    return user;
  }

  // Account operations
  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return Array.from(this.accounts.values()).filter(
      (account) => account.userId === userId,
    );
  }

  async createAccount(account: Omit<Account, "id">): Promise<Account> {
    const id = this.accountIdCounter++;
    const newAccount: Account = { id, ...account };
    this.accounts.set(id, newAccount);
    return newAccount;
  }

  // Transaction operations
  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => {
        const dateA = a.date ? a.date.getTime() : 0;
        const dateB = b.date ? b.date.getTime() : 0;
        return dateB - dateA;
      });
  }

  async createTransaction(transaction: Omit<Transaction, "id" | "date">): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const newTransaction: Transaction = {
      id,
      ...transaction,
      date: new Date(),
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  // Card operations
  async getCardsByUserId(userId: number): Promise<Card[]> {
    return Array.from(this.cards.values()).filter(
      (card) => card.userId === userId,
    );
  }

  async createCard(card: Omit<Card, "id" | "isFrozen">): Promise<Card> {
    const id = this.cardIdCounter++;
    const newCard: Card = {
      id,
      ...card,
      isFrozen: false,
      spendingLimit: card.spendingLimit || null,
    };
    this.cards.set(id, newCard);
    return newCard;
  }

  async updateCardFreezeStatus(cardId: number, userId: number, isFrozen: boolean): Promise<Card> {
    const card = this.cards.get(cardId);
    if (!card) {
      throw new Error("Card not found");
    }
    if (card.userId !== userId) {
      throw new Error("Unauthorized access to card");
    }
    
    const updatedCard: Card = { ...card, isFrozen };
    this.cards.set(cardId, updatedCard);
    return updatedCard;
  }

  // Exchange operations
  async getExchangesByUserId(userId: number): Promise<Exchange[]> {
    return Array.from(this.exchanges.values())
      .filter((exchange) => exchange.userId === userId)
      .sort((a, b) => {
        const dateA = a.date ? a.date.getTime() : 0;
        const dateB = b.date ? b.date.getTime() : 0;
        return dateB - dateA;
      });
  }

  async createExchange(exchange: Omit<Exchange, "id" | "date">): Promise<Exchange> {
    const id = this.exchangeIdCounter++;
    const newExchange: Exchange = {
      id,
      ...exchange,
      date: new Date(),
    };
    this.exchanges.set(id, newExchange);
    return newExchange;
  }

  // Settings operations
  async getSettingsByUserId(userId: number): Promise<Settings | undefined> {
    return Array.from(this.settings.values()).find(
      (settings) => settings.userId === userId,
    );
  }

  async createSettings(settings: Omit<Settings, "id">): Promise<Settings> {
    const id = this.settingsIdCounter++;
    const newSettings: Settings = { id, ...settings };
    this.settings.set(id, newSettings);
    return newSettings;
  }

  async updateSettings(userId: number, settingsUpdate: Partial<Settings>): Promise<Settings> {
    const existingSettings = await this.getSettingsByUserId(userId);
    if (!existingSettings) {
      throw new Error("Settings not found");
    }
    
    const updatedSettings: Settings = {
      ...existingSettings,
      ...settingsUpdate,
      userId, // Ensure userId doesn't change
      id: existingSettings.id, // Ensure id doesn't change
    };
    
    this.settings.set(existingSettings.id, updatedSettings);
    return updatedSettings;
  }
}

export const storage = new MemStorage();
