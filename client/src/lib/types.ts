// Business Information types
export interface BusinessInfo {
  businessName: string;
  businessWebsite?: string;
  industry: string;
  contactName: string;
  email: string;
}

// Business Goals types
export interface Goals {
  generateLeads: boolean;
  improveConversion: boolean;
  increaseRetention: boolean;
  boostOrderValue: boolean;
  budget: string;
}

// Complete funnel data
export interface FunnelData {
  businessInfo: BusinessInfo;
  goals: Goals;
  selectedPlan: string;
}

// Lead types
export interface Lead {
  id: number;
  email: string;
  businessName: string;
  website?: string;
  createdAt: string;
}

// Customer types
export interface Customer {
  id: number;
  userId: number;
  businessName: string;
  businessWebsite?: string;
  industry: string;
  contactName: string;
  email: string;
  plan: string;
  stripeCustomerId?: string;
  createdAt: string;
}

// Payment types
export interface Payment {
  id: number;
  customerId: number;
  amount: number;
  currency: string;
  status: string;
  paymentIntentId: string;
  createdAt: string;
}
