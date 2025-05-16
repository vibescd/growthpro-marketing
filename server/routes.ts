import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import { 
  insertLeadSchema,
  insertCustomerSchema, 
  updateCustomerWithStripeSchema 
} from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable. Stripe payments will not work properly.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil" as any,
}) : undefined;

export async function registerRoutes(app: Express): Promise<Server> {
  // API to add a new lead
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "An error occurred while creating the lead" });
      }
    }
  });
  
  // API to get all leads
  app.get("/api/leads", async (_req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching leads" });
    }
  });

  // Register a customer before payment
  app.post("/api/register-customer", async (req, res) => {
    try {
      const validatedData = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(validatedData);
      res.status(201).json(customer);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "An error occurred while registering the customer" });
      }
    }
  });

  // Create a payment intent with Stripe
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }

    try {
      const { amount, plan } = z.object({
        amount: z.number().positive(),
        plan: z.string(),
      }).parse(req.body);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          plan: plan
        }
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ message: `Error creating payment intent: ${message}` });
      }
    }
  });

  // Update customer with Stripe info after successful payment
  app.post("/api/update-customer-with-stripe", async (req, res) => {
    try {
      const validatedData = updateCustomerWithStripeSchema.parse(req.body);
      const customer = await storage.updateCustomerWithStripe(
        validatedData.customerId,
        validatedData.stripeCustomerId,
        validatedData.stripeSubscriptionId
      );
      res.json(customer);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "An error occurred while updating the customer" });
      }
    }
  });
  
  // API to get all customers
  app.get("/api/customers", async (_req, res) => {
    try {
      const customers = await storage.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching customers" });
    }
  });
  
  // API to get all payments
  app.get("/api/payments", async (_req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching payments" });
    }
  });

  // Record a payment in our system
  app.post("/api/record-payment", async (req, res) => {
    try {
      const { customerId, amount, paymentIntentId } = z.object({
        customerId: z.number(),
        amount: z.number().positive(),
        paymentIntentId: z.string(),
      }).parse(req.body);

      const payment = await storage.createPayment({
        customerId,
        amount,
        currency: "usd",
        status: "succeeded",
        paymentIntentId,
      });

      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "An error occurred while recording the payment" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
