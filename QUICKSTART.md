# Quick Start Guide

## ✅ Your Portfolio is Ready!

The development server is running at: **http://localhost:3000**

## 🎯 Next Steps

### 1. Customize Your Content

**Replace placeholder text:**
- `app/layout.tsx` - Update site title, description, social tags
- `components/Hero.tsx` - Change headline and call-to-action text
- `components/Footer.tsx` - Update social media links
- `lib/projects.ts` - Add your real projects
- `lib/constants.ts` - Update services, testimonials, tech stack

**Replace "Your Name" everywhere:**
```bash
# Find all occurrences
grep -r "Your Name" app/ components/
grep -r "your-email@example.com" app/ components/
grep -r "@yourusername" app/ components/
```

### 2. Add Images

**Required images to add to `/public/`:**
- `og-image.jpg` (1200x630px) - For social media sharing
- `projects/` folder - Add project screenshots
- `avatars/` folder - For testimonial avatars (optional)

### 3. Configure Email (for contact form)

Edit `.env.local` with your SMTP settings:
- For Gmail: Enable 2FA and create an App Password
- For SendGrid: Use your API key as password
- For custom SMTP: Use your provider's settings

### 4. Test Everything

**Check these pages:**
- ✅ Home: http://localhost:3000
- ✅ Projects: http://localhost:3000/projects
- ✅ About: http://localhost:3000/about
- ✅ Project details: http://localhost:3000/projects/ecommerce-platform

**Test features:**
- Dark mode toggle (top right)
- Mobile menu (resize browser)
- Contact form submission
- Project filtering
- Smooth scroll navigation

### 5. Build for Production

```bash
# Create production build
npm run build

# Test production locally
npm run start

# Check at http://localhost:3000
```

### 6. Deploy to Vercel

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel dashboard:
1. Push code to GitHub
2. Import project at vercel.com
3. Add environment variables
4. Deploy!

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Change these values
    600: '#0ea5e9', // Main color
  }
}
```

### Add More Projects
Edit `lib/projects.ts`:
```typescript
{
  slug: 'my-project',
  title: 'My Project',
  // ... full fields
}
```

### Modify Services
Edit `lib/constants.ts` → `services` array

### Update Tech Stack
Edit `lib/constants.ts` → `techStack` array

## 📝 Common Tasks

### Add a new page
```bash
mkdir app/newpage
touch app/newpage/page.tsx
```

### Add a new component
```bash
touch components/NewComponent.tsx
```

### Update site URL
Edit `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🐛 Troubleshooting

**Dark mode not working:**
- Clear browser localStorage
- Check ThemeProvider is in layout.tsx

**Contact form not sending:**
- Verify SMTP credentials in .env.local
- Check email provider allows less secure apps

**Build errors:**
- Run `npm install` again
- Delete `.next` folder and rebuild

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel Deployment](https://vercel.com/docs)

## 🚀 Performance Tips

- Optimize images before uploading (use WebP format)
- Keep bundle size small
- Test on mobile devices
- Run Lighthouse audits

---

**Ready to launch your portfolio!** 🎉
