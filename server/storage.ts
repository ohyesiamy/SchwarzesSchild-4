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
  updateAccountBalance(accountId: number, userId: number, balance: number): Promise<Account>;
  
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
  
  // Admin operations
  getAdminStats(): Promise<any>;
  getAllUsersForAdmin(): Promise<any[]>;
  updateUserStatus(userId: number, action: string): Promise<any>;
  processAdminTransfer(userId: number, amount: number, reason: string): Promise<any>;
  
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
  
  async updateAccountBalance(accountId: number, userId: number, balance: number): Promise<Account> {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    if (account.userId !== userId) {
      throw new Error("Unauthorized access to account");
    }
    
    const updatedAccount: Account = { ...account, balance };
    this.accounts.set(accountId, updatedAccount);
    return updatedAccount;
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

  // Admin operations
  async getAdminStats(): Promise<any> {
    const totalUsers = this.users.size;
    const activeUsers = Array.from(this.users.values()).filter(u => u.username !== "admin").length;
    const suspendedUsers = 0;
    
    const allAccounts = Array.from(this.accounts.values());
    const totalBalance = allAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    const monthlyTransactions = this.transactions.size;
    const flaggedAccounts = 0;
    
    return {
      totalUsers,
      activeUsers,
      suspendedUsers,
      totalBalance,
      monthlyTransactions,
      flaggedAccounts
    };
  }

  async getAllUsersForAdmin(): Promise<any[]> {
    return Array.from(this.users.values())
      .filter(user => user.username !== "admin")
      .map(user => {
        const userAccounts = Array.from(this.accounts.values())
          .filter(acc => acc.userId === user.id);
        
        const totalBalance = userAccounts.reduce((sum, acc) => sum + acc.balance, 0);
        const primaryAccount = userAccounts[0];
        
        return {
          id: user.id,
          username: user.username,
          fullname: user.fullname || user.username,
          email: `${user.username}@example.com`,
          accountNumber: user.accountNumber || `SS-2024-${user.id.toString().padStart(4, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
          totalBalance,
          currency: primaryAccount?.currency || "EUR",
          status: "active",
          lastLogin: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          joinDate: user.memberSince || new Date(),
          riskLevel: totalBalance > 100000 ? "high" : totalBalance > 50000 ? "medium" : "low",
          accountType: totalBalance > 100000 ? "premium" : "standard"
        };
      });
  }

  async updateUserStatus(userId: number, action: string): Promise<any> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    return { 
      success: true, 
      message: `User ${action} successfully`,
      userId 
    };
  }

  async processAdminTransfer(userId: number, amount: number, reason: string): Promise<any> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const userAccounts = Array.from(this.accounts.values())
      .filter(acc => acc.userId === userId);
    
    if (userAccounts.length === 0) {
      throw new Error("No accounts found for user");
    }
    
    const primaryAccount = userAccounts[0];
    const newBalance = primaryAccount.balance + amount;
    await this.updateAccountBalance(primaryAccount.id, userId, newBalance);
    
    await this.createTransaction({
      userId,
      accountId: primaryAccount.id,
      name: `Admin Transfer: ${reason}`,
      amount,
      currency: primaryAccount.currency,
      category: "admin_transfer"
    });
    
    return {
      success: true,
      message: "Transfer processed successfully",
      amount,
      newBalance
    };
  }
}

// Import DatabaseStorage
import { DatabaseStorage } from "./db-storage";

// Use database storage instead of memory storage
export const storage = new DatabaseStorage();
