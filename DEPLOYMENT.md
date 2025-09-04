# Deployment Guide for GreenMetric.my

This guide covers deploying the GreenMetric.my ESG platform to various hosting providers.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/greenmetric-my)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/greenmetric-my)

## 📋 Pre-deployment Checklist

### 1. Environment Setup
- [ ] Configure environment variables
- [ ] Set up Supabase project (if using database)
- [ ] Configure domain settings
- [ ] Set up analytics (optional)

### 2. Build Configuration
- [ ] Test production build locally
- [ ] Verify static export works
- [ ] Check all routes are accessible
- [ ] Validate PDF export functionality

### 3. Performance Optimization
- [ ] Optimize images
- [ ] Minimize bundle size
- [ ] Enable compression
- [ ] Configure caching headers

## 🔧 Detailed Deployment Instructions

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Netlify Deployment

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18.x`

2. **Redirects Configuration**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### Self-Hosted Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Serve Static Files**
   ```bash
   # Using serve
   npx serve out
   
   # Using nginx
   # Copy 'out' directory to nginx web root
   ```

## 🗄️ Database Setup (Optional)

### Supabase Configuration

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and anon key

2. **Run Migrations**
   ```sql
   -- Copy contents from supabase/migrations/
   -- Run in Supabase SQL editor
   ```

3. **Configure Environment**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## 🔒 Security Considerations

### Production Security
- [ ] Enable HTTPS
- [ ] Configure CSP headers
- [ ] Set up rate limiting
- [ ] Enable security headers

### Data Protection
- [ ] Implement proper authentication
- [ ] Secure API endpoints
- [ ] Encrypt sensitive data
- [ ] Regular security audits

## 📊 Monitoring & Analytics

### Performance Monitoring
- Set up Vercel Analytics
- Configure Core Web Vitals tracking
- Monitor bundle size
- Track loading performance

### Business Analytics
- Google Analytics 4
- User behavior tracking
- Conversion funnel analysis
- ESG tool usage metrics

## 🔄 CI/CD Pipeline

### GitHub Actions (Example)
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 🌐 Domain Configuration

### Custom Domain Setup
1. Purchase domain (e.g., greenmetric.my)
2. Configure DNS records
3. Set up SSL certificate
4. Update environment variables

### DNS Configuration
```
Type    Name    Value
A       @       76.76.19.61
CNAME   www     your-app.vercel.app
```

## 📈 Scaling Considerations

### Performance Optimization
- Enable CDN
- Implement caching strategies
- Optimize images and assets
- Use compression

### Database Scaling
- Connection pooling
- Read replicas
- Query optimization
- Backup strategies

## 🆘 Troubleshooting

### Common Issues

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

**PDF Export Issues**
- Ensure html2canvas dependencies are available
- Check browser compatibility
- Verify element IDs exist

**Authentication Problems**
- Verify environment variables
- Check Supabase configuration
- Review RLS policies

## 📞 Support

For deployment support:
- Email: dev@greenmetric.my
- Documentation: [docs.greenmetric.my](https://docs.greenmetric.my)
- GitHub Issues: Create an issue for bugs

---

**Ready to deploy Malaysia's premier ESG platform! 🚀**