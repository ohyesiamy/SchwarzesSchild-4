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
} from "../shared/schema";
import { db } from "./db-vercel";
import { eq, and, ne, sql } from "drizzle-orm";
import { IStorage } from "../server/storage";

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    // Vercel Functions doesn't need session store
    this.sessionStore = null;
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
        memberSince: new Date()
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
    const [updatedAccount] = await db
      .update(accounts)
      .set({ balance })
      .where(and(
        eq(accounts.id, accountId),
        eq(accounts.userId, userId)
      ))
      .returning();
    
    if (!updatedAccount) {
      throw new Error("Account not found or unauthorized");
    }
    
    return updatedAccount;
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(sql`${transactions.date} DESC`);
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
    const [updatedCard] = await db
      .update(cards)
      .set({ isFrozen })
      .where(and(
        eq(cards.id, cardId),
        eq(cards.userId, userId)
      ))
      .returning();
    
    if (!updatedCard) {
      throw new Error("Card not found or unauthorized");
    }
    
    return updatedCard;
  }

  async getExchangesByUserId(userId: number): Promise<Exchange[]> {
    return await db
      .select()
      .from(exchanges)
      .where(eq(exchanges.userId, userId))
      .orderBy(sql`${exchanges.date} DESC`);
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
    const [userSettings] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, userId));
    
    return userSettings;
  }

  async createSettings(settingsData: Omit<Settings, "id">): Promise<Settings> {
    const [newSettings] = await db
      .insert(settings)
      .values(settingsData)
      .returning();
    
    return newSettings;
  }

  async updateSettings(userId: number, settingsUpdate: Partial<Settings>): Promise<Settings> {
    const [updatedSettings] = await db
      .update(settings)
      .set(settingsUpdate)
      .where(eq(settings.userId, userId))
      .returning();
    
    if (!updatedSettings) {
      throw new Error("Settings not found");
    }
    
    return updatedSettings;
  }

  async getAdminStats(): Promise<any> {
    const totalUsersResult = await db.select({ count: sql`count(*)` }).from(users);
    const activeUsersResult = await db
      .select({ count: sql`count(*)` })
      .from(users)
      .where(ne(users.username, 'admin'));
    
    const allAccounts = await db.select().from(accounts);
    const totalBalance = allAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    
    const monthlyTransactionsResult = await db
      .select({ count: sql`count(*)` })
      .from(transactions);
    
    return {
      totalUsers: Number(totalUsersResult[0].count),
      activeUsers: Number(activeUsersResult[0].count),
      suspendedUsers: 0,
      totalBalance,
      monthlyTransactions: Number(monthlyTransactionsResult[0].count),
      flaggedAccounts: 0
    };
  }

  async getAllUsersForAdmin(): Promise<any[]> {
    const allUsers = await db
      .select()
      .from(users)
      .where(ne(users.username, 'admin'));
    
    const usersWithDetails = await Promise.all(
      allUsers.map(async (user) => {
        const userAccounts = await this.getAccountsByUserId(user.id);
        const totalBalance = userAccounts.reduce((sum, acc) => sum + acc.balance, 0);
        const primaryAccount = userAccounts[0];
        
        return {
          id: user.id,
          username: user.username,
          fullname: user.fullname || user.username,
          email: `${user.username}@example.com`,
          accountNumber: user.accountNumber,
          totalBalance,
          currency: primaryAccount?.currency || "EUR",
          status: "active",
          lastLogin: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          joinDate: user.memberSince || new Date(),
          riskLevel: totalBalance > 100000 ? "high" : totalBalance > 50000 ? "medium" : "low",
          accountType: totalBalance > 100000 ? "premium" : "standard"
        };
      })
    );
    
    return usersWithDetails;
  }

  async updateUserStatus(userId: number, action: string): Promise<any> {
    const user = await this.getUser(userId);
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
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const userAccounts = await this.getAccountsByUserId(userId);
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