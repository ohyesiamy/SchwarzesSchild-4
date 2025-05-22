import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Accounts API
  app.get("/api/accounts", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const accounts = await storage.getAccountsByUserId(req.user.id);
      res.json(accounts);
    } catch (error) {
      next(error);
    }
  });

  // Transactions API
  app.get("/api/transactions", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const transactions = await storage.getTransactionsByUserId(req.user.id);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/transactions", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const transaction = await storage.createTransaction({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  });

  // Cards API
  app.get("/api/cards", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const cards = await storage.getCardsByUserId(req.user.id);
      res.json(cards);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/cards", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const card = await storage.createCard({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/cards/:id/freeze", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const card = await storage.updateCardFreezeStatus(
        parseInt(req.params.id), 
        req.user.id, 
        req.body.isFrozen
      );
      res.json(card);
    } catch (error) {
      next(error);
    }
  });

  // Exchanges API
  app.get("/api/exchanges", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const exchanges = await storage.getExchangesByUserId(req.user.id);
      res.json(exchanges);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/exchanges", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const exchange = await storage.createExchange({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(exchange);
    } catch (error) {
      next(error);
    }
  });

  // Settings API
  app.get("/api/settings", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const settings = await storage.getSettingsByUserId(req.user.id);
      res.json(settings);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/settings", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const settings = await storage.updateSettings(req.user.id, req.body);
      res.json(settings);
    } catch (error) {
      next(error);
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
