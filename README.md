# GrowthPro Business Website

A modern business website with Stripe payment processing and a programmatic sales/marketing funnel.

![GrowthPro Logo](https://via.placeholder.com/200x50?text=GrowthPro)

## Overview

GrowthPro is a full-featured business website designed for marketing consultancies and agencies. It includes:

- Responsive landing page with multiple sections
- Multi-step sales funnel with lead capture
- Stripe payment integration for service subscriptions
- Customer management system

## Features

### Landing Page
- Hero section with lead generation form
- Services showcase
- Process explanation
- Client testimonials
- Pricing plans

### Sales Funnel
- Step 1: Business information collection
- Step 2: Business goals assessment
- Step 3: Plan selection
- Step 4: Payment processing with Stripe
- Step 5: Confirmation and onboarding

### Admin Features
- Lead management
- Customer tracking
- Payment history

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui components
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query (React Query)
- **Styling**: TailwindCSS with custom theming
- **Backend**: Node.js, Express
- **Payment Processing**: Stripe
- **Build Tool**: Vite

## Project Structure

```
├── client/               # Frontend code
│   ├── src/
│   │   ├── components/   # UI components
│   │   │   ├── ui/       # Base UI components (shadcn)
│   │   │   ├── layout/   # Layout components (Header, Footer)
│   │   │   ├── home/     # Homepage components
│   │   │   └── funnel/   # Sales funnel components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and types
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Entry point
├── server/               # Backend code
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage implementation
│   └── vite.ts           # Vite server configuration
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema and types
└── package.json          # Project dependencies and scripts
```

## Getting Started

See [SETUP.md](SETUP.md) for detailed installation and setup instructions.

### Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Environment Variables section)
4. Start development server: `npm run dev`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Customization

### Theme

The color scheme can be customized in `tailwind.config.ts` file.

### Content

Update the website content by modifying:
- Text and data in component files in `client/src/components/home/`
- Pricing plans in `client/src/components/home/PricingSection.tsx`
- Sales funnel steps in `client/src/components/funnel/`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Stripe](https://stripe.com/)
- [React](https://reactjs.org/)