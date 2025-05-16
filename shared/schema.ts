import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Lead schema for capturing initial interest
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  businessName: text("business_name").notNull(),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  email: true,
  businessName: true,
  website: true,
});

// Customer schema for users who proceed through the funnel
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  businessName: text("business_name").notNull(),
  businessWebsite: text("business_website"),
  industry: text("industry").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  plan: text("plan").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCustomerSchema = createInsertSchema(customers).pick({
  businessName: true,
  businessWebsite: true,
  industry: true,
  contactName: true,
  email: true,
  plan: true,
});

export const updateCustomerWithStripeSchema = z.object({
  customerId: z.number(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string().optional(),
});

// Payment schema for tracking payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  status: text("status").notNull(),
  paymentIntentId: text("payment_intent_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  customerId: true,
  amount: true,
  currency: true,
  status: true,
  paymentIntentId: true,
});

// Types - For in-memory use (not identical to DB schema)
export type User = {
  id: number;
  username: string;
  password: string;
};
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Lead = {
  id: number;
  email: string;
  businessName: string;
  website: string | null;
  createdAt: Date;
};
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Customer = {
  id: number;
  userId: number;
  businessName: string;
  businessWebsite: string | null;
  industry: string;
  contactName: string;
  email: string;
  plan: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: Date;
};
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

export type Payment = {
  id: number;
  customerId: number;
  amount: number;
  currency: string;
  status: string;
  paymentIntentId: string;
  createdAt: Date;
};
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
