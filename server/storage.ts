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

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  
  // Customer methods
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomerWithStripe(customerId: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<Customer>;
  getAllCustomers(): Promise<Customer[]>;
  
  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getAllPayments(): Promise<Payment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private customers: Map<number, Customer>;
  private payments: Map<number, Payment>;
  
  currentId: number;
  currentLeadId: number;
  currentCustomerId: number;
  currentPaymentId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.customers = new Map();
    this.payments = new Map();
    
    this.currentId = 1;
    this.currentLeadId = 1;
    this.currentCustomerId = 1;
    this.currentPaymentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = {
      ...insertLead,
      id,
      website: insertLead.website || null,
      createdAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }
  
  // Customer methods
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const customer: Customer = {
      ...insertCustomer,
      id,
      userId: 1, // Default user ID since we're not implementing full auth
      businessWebsite: insertCustomer.businessWebsite || null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      createdAt: new Date()
    };
    this.customers.set(id, customer);
    return customer;
  }
  
  async updateCustomerWithStripe(
    customerId: number, 
    stripeCustomerId: string, 
    stripeSubscriptionId?: string
  ): Promise<Customer> {
    const customer = this.customers.get(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    
    const updatedCustomer: Customer = {
      ...customer,
      stripeCustomerId: stripeCustomerId,
      stripeSubscriptionId: stripeSubscriptionId || null
    };
    
    this.customers.set(customerId, updatedCustomer);
    return updatedCustomer;
  }
  
  // Get all leads
  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }
  
  // Get all customers
  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }
  
  // Payment methods
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = this.currentPaymentId++;
    const payment: Payment = {
      ...insertPayment,
      id,
      createdAt: new Date()
    };
    this.payments.set(id, payment);
    return payment;
  }
  
  // Get all payments
  async getAllPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }
}

// Importing the DatabaseStorage
import { DatabaseStorage } from "./dbStorage";

// Use either MemStorage or DatabaseStorage based on environment
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage()
  : new MemStorage();
