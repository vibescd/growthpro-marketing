import { 
  users, 
  leads, 
  customers, 
  payments,
  type User, 
  type InsertUser,
  type Lead,
  type InsertLead,
  type Customer,
  type InsertCustomer,
  type Payment,
  type InsertPayment 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const result = await db.insert(leads).values({
      ...insertLead,
      website: insertLead.website || null,
      createdAt: new Date()
    }).returning();
    return result[0];
  }
  
  // Customer methods
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const result = await db.insert(customers).values({
      ...insertCustomer,
      userId: 1, // Default user ID since we're not implementing full auth
      businessWebsite: insertCustomer.businessWebsite || null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      createdAt: new Date()
    }).returning();
    return result[0];
  }
  
  async updateCustomerWithStripe(
    customerId: number, 
    stripeCustomerId: string, 
    stripeSubscriptionId?: string
  ): Promise<Customer> {
    const result = await db.update(customers)
      .set({
        stripeCustomerId: stripeCustomerId,
        stripeSubscriptionId: stripeSubscriptionId || null
      })
      .where(eq(customers.id, customerId))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    
    return result[0];
  }
  
  // Payment methods
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values({
      ...insertPayment,
      createdAt: new Date()
    }).returning();
    return result[0];
  }
  
  // Admin dashboard methods
  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(leads.createdAt);
  }
  
  async getAllCustomers(): Promise<Customer[]> {
    return await db.select().from(customers).orderBy(customers.createdAt);
  }
  
  async getAllPayments(): Promise<Payment[]> {
    return await db.select().from(payments).orderBy(payments.createdAt);
  }
}