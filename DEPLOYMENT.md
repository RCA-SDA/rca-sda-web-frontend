# Deployment Guide

This guide covers deploying the RCA-SDA Church Management System to production.

## Prerequisites

- Node.js 20+ installed
- A database (PostgreSQL, MySQL, or MongoDB)
- A file storage solution (AWS S3, Cloudinary, or Vercel Blob)
- A hosting platform account (Vercel, Netlify, or similar)

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest option for Next.js applications.

### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   DATABASE_URL=your-database-connection-string
   NEXTAUTH_SECRET=your-secret-key
   AWS_ACCESS_KEY_ID=your-key
   AWS_SECRET_ACCESS_KEY=your-secret
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like `https://your-app.vercel.app`

### Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `rcasda.org`)
4. Follow DNS configuration instructions

## Option 2: Deploy to Netlify

### Steps:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

4. **Add Environment Variables**
   In Netlify dashboard → Site settings → Environment variables

5. **Deploy**

## Option 3: Self-Hosted (VPS/Cloud Server)

### Requirements:
- Ubuntu 22.04 or similar
- Nginx or Apache
- PM2 for process management
- SSL certificate (Let's Encrypt)

### Steps:

1. **Set up the server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   ```

2. **Clone and build the project**
   ```bash
   cd /var/www
   git clone <your-repo-url> rca-sda
   cd rca-sda
   npm install
   npm run build
   ```

3. **Create PM2 ecosystem file**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'rca-sda',
       script: 'npm',
       args: 'start',
       cwd: '/var/www/rca-sda',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/rca-sda
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable site and restart Nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/rca-sda /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Set up SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Database Setup

### PostgreSQL (Recommended)

1. **Install PostgreSQL**
   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

2. **Create database and user**
   ```sql
   sudo -u postgres psql
   CREATE DATABASE rca_sda;
   CREATE USER rca_admin WITH PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE rca_sda TO rca_admin;
   ```

3. **Run migrations**
   Use your chosen ORM to run migrations (Prisma, Drizzle, etc.)

### Supabase (Managed PostgreSQL)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string
4. Add to environment variables

## File Storage Setup

### AWS S3

1. Create S3 bucket
2. Configure CORS:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["https://your-domain.com"],
       "ExposeHeaders": []
     }
   ]
   ```
3. Create IAM user with S3 access
4. Add credentials to environment variables

### Cloudinary

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get API credentials from dashboard
3. Add to environment variables

## Monitoring and Maintenance

### Set up monitoring

1. **Vercel Analytics** (if using Vercel)
   - Automatically included
   - View in Vercel dashboard

2. **PM2 Monitoring** (if self-hosted)
   ```bash
   pm2 monit
   pm2 logs
   ```

3. **Error Tracking**
   - Set up [Sentry](https://sentry.io)
   - Add to your Next.js app

### Backup Strategy

1. **Database backups**
   ```bash
   # PostgreSQL backup
   pg_dump -U rca_admin rca_sda > backup_$(date +%Y%m%d).sql
   
   # Automate with cron
   0 2 * * * /usr/bin/pg_dump -U rca_admin rca_sda > /backups/db_$(date +\%Y\%m\%d).sql
   ```

2. **File backups**
   - Use AWS S3 versioning
   - Or set up automated backups to another storage

### Updates

```bash
# Pull latest changes
cd /var/www/rca-sda
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart
pm2 restart rca-sda
```

## Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Set strong database passwords
- [ ] Enable database connection encryption
- [ ] Use environment variables for secrets
- [ ] Set up CORS properly
- [ ] Enable rate limiting
- [ ] Keep dependencies updated
- [ ] Set up firewall rules
- [ ] Regular security audits
- [ ] Implement proper authentication
- [ ] Use CSP headers
- [ ] Enable security headers in Nginx/Apache

## Performance Optimization

1. **Enable caching**
   - Use Next.js built-in caching
   - Configure CDN (Vercel Edge, Cloudflare)

2. **Image optimization**
   - Use Next.js Image component
   - Compress images before upload

3. **Database optimization**
   - Add proper indexes
   - Use connection pooling
   - Implement query caching

4. **Monitor performance**
   - Use Lighthouse
   - Set up performance monitoring
   - Track Core Web Vitals

## Troubleshooting

### Build fails
- Check Node.js version (should be 20+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors

### Database connection issues
- Verify connection string
- Check firewall rules
- Ensure database is running

### File upload issues
- Check storage credentials
- Verify CORS configuration
- Check file size limits

## Support

For issues or questions:
- Check the README.md
- Review error logs
- Contact the development team

## Rollback Plan

If deployment fails:

1. **Vercel**: Use "Rollback" button in dashboard
2. **Self-hosted**: 
   ```bash
   git checkout <previous-commit>
   npm install
   npm run build
   pm2 restart rca-sda
   ```

## Cost Estimates

### Vercel (Hobby Plan)
- Free for small projects
- $20/month for Pro features

### Self-Hosted VPS
- $5-20/month (DigitalOcean, Linode)
- + Domain: $10-15/year
- + SSL: Free (Let's Encrypt)

### Database
- Supabase: Free tier available
- AWS RDS: ~$15-50/month
- Self-hosted: Included in VPS cost

### File Storage
- AWS S3: ~$0.023/GB/month
- Cloudinary: Free tier (25GB)
- Vercel Blob: $0.15/GB/month
