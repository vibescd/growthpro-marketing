# GrowthPro Marketing Platform - Ubuntu 24.04 Setup Guide

This comprehensive guide will help you deploy the GrowthPro Marketing Platform on Ubuntu 24.04 LTS. Follow these steps to set up a production-ready environment.

## Prerequisites

- Ubuntu 24.04 LTS server
- Root or sudo access
- Domain name (optional, but recommended for production)
- Stripe account with API keys

## 1. Initial Server Setup

### Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

### Configure Firewall

```bash
sudo apt install -y ufw
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Create Non-Root User (Optional, but Recommended)

```bash
sudo adduser growthpro
sudo usermod -aG sudo growthpro
sudo su - growthpro
```

## 2. Install Required Dependencies

### Install Node.js 20.x

```bash
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Verify Node.js Installation

```bash
node --version  # Should show v20.x.x
npm --version   # Should show v10.x.x
```

### Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
```

### Install Git and Other Tools

```bash
sudo apt install -y git build-essential
```

## 3. Set Up PostgreSQL Database

### Create Database and User

```bash
sudo -u postgres psql -c "CREATE USER growthpro WITH PASSWORD 'strong-password-here';"
sudo -u postgres psql -c "CREATE DATABASE growthprodb OWNER growthpro;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE growthprodb TO growthpro;"
```

### Enable Remote Connections (Optional)

Edit the PostgreSQL configuration file if remote connections are needed:

```bash
sudo nano /etc/postgresql/16/main/postgresql.conf
```

Uncomment and modify:
```
listen_addresses = '*'
```

Then edit:
```bash
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Add at the end:
```
host    all             all             0.0.0.0/0               md5
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

## 4. Clone and Configure the Application

### Clone the Repository

```bash
mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/vibescd/growthpro-marketing.git growthpro
sudo chown -R growthpro:growthpro growthpro
cd growthpro
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file:

```bash
sudo nano .env
```

Add the following variables:

```
NODE_ENV=production
DATABASE_URL=postgres://growthpro:strong-password-here@localhost:5432/growthprodb
STRIPE_SECRET_KEY=sk_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_your_stripe_public_key
```

## 5. Database Initialization

Run the database migration to set up the tables:

```bash
npm run db:push
```

## 6. Build the Application

Build the production version of the application:

```bash
npm run build
```

## 7. Set Up Process Manager (PM2)

### Install PM2

```bash
sudo npm install -g pm2
```

### Create PM2 Configuration

```bash
sudo nano /var/www/growthpro/ecosystem.config.js
```

Add the following configuration:

```javascript
module.exports = {
  apps: [{
    name: "growthpro",
    script: "dist/index.js",
    env: {
      NODE_ENV: "production",
      DATABASE_URL: "postgres://growthpro:strong-password-here@localhost:5432/growthprodb",
      STRIPE_SECRET_KEY: "sk_your_stripe_secret_key",
      VITE_STRIPE_PUBLIC_KEY: "pk_your_stripe_public_key"
    },
    instances: "max",
    exec_mode: "cluster",
    watch: false,
    max_memory_restart: "1G",
  }]
};
```

### Start the Application with PM2

```bash
cd /var/www/growthpro
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Execute the command provided by the last command to ensure PM2 starts on boot.

## 8. Configure Nginx as a Reverse Proxy

### Install Nginx

```bash
sudo apt install -y nginx
```

### Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/growthpro
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:5000;  # Port used by the application
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Enable the Nginx Site Configuration

```bash
sudo ln -s /etc/nginx/sites-available/growthpro /etc/nginx/sites-enabled/
sudo nginx -t  # Test the configuration
sudo systemctl restart nginx
```

## 9. Set Up SSL with Let's Encrypt (Optional but Recommended)

### Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Obtain SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts to complete the certificate setup.

## 10. Additional Security Measures

### Set Up Automatic Security Updates

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Configure Fail2Ban to Protect Against Brute Force Attacks

```bash
sudo apt install -y fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl restart fail2ban
```

## 11. Monitoring Setup

### Basic System Monitoring

```bash
sudo apt install -y htop
```

### Set Up Application Monitoring with PM2

```bash
pm2 install pm2-logrotate
```

View monitoring dashboard:
```bash
pm2 monit
```

## 12. Regular Maintenance Tasks

### Database Backup Script

Create a backup script:

```bash
sudo nano /usr/local/bin/backup-db.sh
```

Add the following content:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/growthpro"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p $BACKUP_DIR
pg_dump -U growthpro growthprodb > $BACKUP_DIR/growthprodb_$TIMESTAMP.sql
find $BACKUP_DIR -type f -mtime +7 -delete  # Keep backups for 7 days
```

Make it executable and create a cron job:

```bash
sudo chmod +x /usr/local/bin/backup-db.sh
sudo crontab -e
```

Add the following line to run the backup daily at 2 AM:

```
0 2 * * * /usr/local/bin/backup-db.sh
```

## 13. Application Updates

When you need to update the application:

```bash
cd /var/www/growthpro
git pull
npm install
npm run build
pm2 restart growthpro
```

## Troubleshooting

### Check Application Logs

```bash
pm2 logs growthpro
```

### Check Nginx Logs

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check PostgreSQL Logs

```bash
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Set to `production` for production environment |
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Secret key from Stripe dashboard (starts with `sk_`) |
| `VITE_STRIPE_PUBLIC_KEY` | Public key from Stripe dashboard (starts with `pk_`) |

## System Requirements

- **Minimum:** 2 CPU cores, 4GB RAM, 20GB SSD
- **Recommended:** 4 CPU cores, 8GB RAM, 40GB SSD

## Additional Resources

- [Official Stripe Documentation](https://stripe.com/docs/api)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
