# Modern Portfolio Website

A highly responsive, modern personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features dark mode, smooth animations, contact form, and optimized for SEO and performance.

## ✨ Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion for tasteful, performant animations
- **Dark Mode**: System-aware theme with manual toggle and persistence
- **Fully Responsive**: Mobile-first design from 320px to 4K displays
- **SEO Optimized**: Meta tags, OpenGraph, sitemap, robots.txt
- **Fast Performance**: Optimized images, lazy loading, excellent Core Web Vitals
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Contact Form**: Client validation + API route with email integration
- **Project Showcase**: Filterable portfolio with detailed case studies
- **Type Safe**: Full TypeScript coverage

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── contact/        # Contact form API endpoint
│   ├── projects/
│   │   ├── [slug]/         # Dynamic project case studies
│   │   └── page.tsx        # Projects listing with filters
│   ├── globals.css         # Global styles and Tailwind
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # Robots.txt configuration
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ContactSection.tsx  # Contact form component
│   ├── CTASection.tsx      # Call-to-action banner
│   ├── FeaturedProjects.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx            # Landing hero section
│   ├── Navbar.tsx          # Sticky navigation with mobile menu
│   ├── Process.tsx         # Work process showcase
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx     # Filterable project grid
│   ├── SectionHeading.tsx  # Reusable section headers
│   ├── Services.tsx        # Services offering section
│   ├── TechStack.tsx       # Technology badges
│   ├── Testimonials.tsx    # Client testimonials
│   ├── ThemeProvider.tsx   # Dark mode context provider
│   └── ThemeToggle.tsx     # Theme switcher button
├── lib/
│   ├── constants.ts        # Services, testimonials, tech stack data
│   └── projects.ts         # Project data and helpers
├── public/                 # Static assets (images, icons, etc.)
├── .env.example            # Environment variables template
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone or download this repository**

```bash
cd portfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values:

```env
# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_TO=your-email@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note for Gmail**: If using Gmail, you need to create an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Update Personal Information

1. **Edit site metadata** in `app/layout.tsx`:
   - Change title, description, social links
   - Update OpenGraph and Twitter card images

2. **Update navigation** in `components/Navbar.tsx`:
   - Modify logo and navigation links

3. **Edit hero content** in `components/Hero.tsx`:
   - Change headline, subheadline, and CTAs

4. **Customize footer** in `components/Footer.tsx`:
   - Update social links and footer content

### Add Your Projects

Edit `lib/projects.ts` to add your own projects:

```typescript
{
  slug: 'your-project',
  title: 'Your Project Title',
  description: 'Short description',
  outcome: 'Key results',
  tags: ['Next.js', 'TypeScript'],
  image: '/projects/your-image.jpg',
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/you/project',
  featured: true,
  category: 'web',
  year: 2026,
  // ... more fields
}
```

### Update Services & Testimonials

Edit `lib/constants.ts`:
- Modify `services` array with your offerings
- Update `testimonials` with real client feedback
- Customize `techStack` with your technologies

### Style Customization

- **Colors**: Edit `tailwind.config.ts` to change the primary color scheme
- **Fonts**: Modify font imports in `app/layout.tsx`
- **Animations**: Adjust Framer Motion settings in individual components

## 📦 Build for Production

```bash
npm run build
npm run start
```

This will create an optimized production build in `.next/`.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect Next.js

3. **Set environment variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**:
   - Click "Deploy"
   - Your site will be live in ~2 minutes

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- **Netlify**: Use the Next.js plugin
- **Cloudflare Pages**: Supports Next.js
- **Railway**: Node.js deployment
- **DigitalOcean App Platform**: Docker or buildpack

## 🎯 Performance

This site is optimized for excellent performance:
- ✅ Lighthouse score 90+
- ✅ Core Web Vitals optimized
- ✅ Image optimization with `next/image`
- ✅ Code splitting and lazy loading
- ✅ Minimal client-side JavaScript

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Color contrast meeting WCAG AA standards

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

## 🛠️ Tech Stack Details

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📧 Support

If you have questions or need help:
- Open an issue on GitHub
- Email: your.email@example.com

---

**Built with ❤️ using Next.js and TypeScript**
