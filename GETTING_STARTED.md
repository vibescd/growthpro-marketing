# Getting Started with GrowthPro

Welcome to GrowthPro, a comprehensive business website with Stripe payment processing and a programmatic sales/marketing funnel. This guide will help you understand the core features and how to use them effectively.

## Core Features

### 1. Lead Capture System
The website features a multi-step sales funnel that collects valuable information from potential customers:

- **Business Information**  
  Collects business name, website, industry, contact name, and email address. This information is stored in the PostgreSQL database as leads.

- **Business Goals**  
  Allows users to specify their marketing goals including lead generation, conversion improvement, customer retention, and average order value enhancement.

- **Plan Selection**  
  Offers three tiered pricing plans to meet different business needs:
  - Starter Plan: $997/month
  - Growth Plan: $1,997/month
  - Enterprise Plan: $3,997/month

### 2. Secure Payment Processing
Integrates with Stripe for secure payment handling:

- Creates Stripe Payment Intents for processing transactions
- Uses Stripe Elements for PCI-compliant credit card collection
- Records successful payments in the database
- Updates customer records with Stripe information for future billing

## How It Works: Complete User Flow

### Step 1: User Enters Business Information
When a visitor fills out the initial form with their business details, the application:
- Validates all input fields using Zod schemas
- Creates a lead record in the PostgreSQL database
- Progresses the user to the next step in the funnel

### Step 2: User Specifies Business Goals
The user selects their marketing objectives and budget range, which:
- Helps tailor the recommended services
- Is stored temporarily in the application state
- Allows for a more personalized experience

### Step 3: User Selects a Pricing Plan
Based on their goals, the user chooses a suitable pricing plan:
- Each plan includes different service levels and features
- The selection determines the payment amount
- This information is stored with the customer record

### Step 4: User Completes Payment
In the final step:
1. The application creates a customer record in the database
2. A Stripe Payment Intent is generated for the selected plan amount
3. The user securely enters their payment details
4. Upon successful payment:
   - The customer record is updated with their Stripe information
   - A payment record is created in the database
   - The user receives a confirmation message

## Database Structure

The application uses PostgreSQL to store all important information:

- **Users Table**: System users for authentication
- **Leads Table**: Prospective customers who have entered their information
- **Customers Table**: Users who have selected a plan and provided payment details
- **Payments Table**: Record of all transactions processed through Stripe

## Technical Architecture

- **Frontend**: React with Vite, using shadcn UI components
- **Backend**: Express.js server with database access
- **Database**: PostgreSQL for data persistence
- **Payment Processing**: Stripe API integration
- **Form Validation**: Zod schema validation

## Next Steps

After setting up the application, you can:

1. **Track leads and customers** through the database
2. **Monitor payment history** for financial records
3. **Analyze conversion rates** from leads to paying customers
4. **Customize marketing messaging** based on collected data

For any technical issues or questions, please refer to the README.md file or contact support.