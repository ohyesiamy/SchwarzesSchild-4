import { DatabaseStorage } from "./db-storage-vercel";

// Create a single instance of storage to be used across all API functions
export const storage = new DatabaseStorage();