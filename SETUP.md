# GrowthPro Business Website - Installation Guide for Ubuntu 24.04

This guide provides step-by-step instructions for installing and setting up the GrowthPro business website with Stripe payment processing and a programmatic sales/marketing funnel.

## Prerequisites

Before starting, ensure you have the following:
- Ubuntu 24.04 server
- Root or sudo access
- Stripe account with API keys (Secret and Publishable keys)

## 1. System Setup

First, update your system packages:

```bash
sudo apt update
sudo apt upgrade -y
```

## 2. Install Node.js and npm

Install Node.js version 20.x:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify the installation:
```bash
node -v
npm -v
```

## 3. Install Git

```bash
sudo apt install git -y
```

## 4. Clone the Repository

Create a directory for the application and clone the repository:

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/your-repo/growthpro-website.git
cd growthpro-website
```

## 5. Install Dependencies

Install all the required packages:

```bash
npm install
```

This will install the following key dependencies:
- Frontend libraries: React, Tailwind CSS, shadcn UI components
- Routing: Wouter
- Form handling: React Hook Form with Zod validation
- State management: TanStack Query (React Query)
- Payment processing: Stripe JS and React Stripe JS
- Server: Express
- Development: TypeScript, Vite

## 6. Environment Configuration

Create a `.env` file in the root directory with your Stripe API keys:

```bash
touch .env
```

Add the following environment variables:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

## 7. Application Structure

The application has the following structure:

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

## 8. Build the Application

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
```

## 9. Setting Up PM2 for Process Management

Install PM2 globally:
```bash
sudo npm install -g pm2
```

Create a PM2 ecosystem configuration file:
```bash
touch ecosystem.config.js
```

Add the following content:
```javascript
module.exports = {
  apps: [{
    name: "growthpro",
    script: "npm",
    args: "start",
    env: {
      NODE_ENV: "production",
      STRIPE_SECRET_KEY: "sk_test_your_stripe_secret_key",
      VITE_STRIPE_PUBLIC_KEY: "pk_test_your_stripe_public_key"
    }
  }]
};
```

Start the application with PM2:
```bash
pm2 start ecosystem.config.js
```

Set up PM2 to start on system boot:
```bash
pm2 startup
pm2 save
```

## 10. Setting Up Nginx as Reverse Proxy

Install Nginx:
```bash
sudo apt install nginx -y
```

Create a new Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/growthpro
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/growthpro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 11. Setting Up SSL with Let's Encrypt

Install Certbot:
```bash
sudo apt install certbot python3-certbot-nginx -y
```

Obtain an SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com
```

## 12. Stripe Webhook Setup (Optional)

If you want to receive Stripe webhook events:

1. Log in to your Stripe Dashboard
2. Go to Developers > Webhooks
3. Add an endpoint: `https://your-domain.com/api/webhooks/stripe`
4. Select the events to listen for (e.g., payment_intent.succeeded)
5. Get your webhook signing secret
6. Add it to your .env file:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

## 13. Monitoring and Logs

Check application logs with PM2:
```bash
pm2 logs growthpro
```

## 14. Project Features

This application includes:

- Responsive marketing website with multiple sections
- Multi-step sales funnel that collects user information
- Stripe payment processing integration
- Server-side API for leads, customers, and payments
- In-memory data storage (can be extended to database)

## 15. Maintenance and Updates

To update the application:
```bash
cd /var/www/growthpro-website
git pull
npm install
npm run build
pm2 restart growthpro
```