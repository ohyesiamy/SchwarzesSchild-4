import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullname: text("fullname"),
  phone: text("phone"),
  accountNumber: text("account_number"),
  memberSince: timestamp("member_since").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  currency: text("currency").notNull(),
  balance: integer("balance").notNull().default(0),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  accountId: integer("account_id").notNull().references(() => accounts.id),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  category: text("category"),
  date: timestamp("date").defaultNow(),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  accountId: integer("account_id").notNull().references(() => accounts.id),
  name: text("name"),
  cardNumber: text("card_number").notNull(),
  expiryDate: text("expiry_date").notNull(),
  isFrozen: boolean("is_frozen").default(false),
  spendingLimit: integer("spending_limit"),
});

export const exchanges = pgTable("exchanges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  fromCurrency: text("from_currency").notNull(),
  toCurrency: text("to_currency").notNull(),
  fromAmount: integer("from_amount").notNull(),
  toAmount: integer("to_amount").notNull(),
  rate: text("rate").notNull(),
  date: timestamp("date").defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  twoFactorEnabled: boolean("two_factor_enabled").default(true),
  pushNotificationsEnabled: boolean("push_notifications_enabled").default(true),
  transactionEmailsEnabled: boolean("transaction_emails_enabled").default(true),
  marketingEnabled: boolean("marketing_enabled").default(false),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullname: true,
});

export const insertAccountSchema = createInsertSchema(accounts).pick({
  userId: true,
  name: true,
  currency: true,
  balance: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  accountId: true,
  name: true,
  amount: true,
  currency: true,
  category: true,
});

export const insertCardSchema = createInsertSchema(cards).pick({
  userId: true,
  accountId: true,
  name: true,
  cardNumber: true,
  expiryDate: true,
  spendingLimit: true,
});

export const insertExchangeSchema = createInsertSchema(exchanges).pick({
  userId: true,
  fromCurrency: true,
  toCurrency: true,
  fromAmount: true,
  toAmount: true,
  rate: true,
});

export const insertSettingsSchema = createInsertSchema(settings).pick({
  userId: true,
  twoFactorEnabled: true,
  pushNotificationsEnabled: true,
  transactionEmailsEnabled: true,
  marketingEnabled: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Card = typeof cards.$inferSelect;
export type Exchange = typeof exchanges.$inferSelect;
export type Settings = typeof settings.$inferSelect;
