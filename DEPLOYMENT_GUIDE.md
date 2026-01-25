# Performance Monitoring & Deployment Guide

## Step 1: Push to Vercel (Automatic)
Your commit is ready. When you push to GitHub, Vercel will:
1. Detect the push to `origin/main`
2. Trigger automatic build
3. Run `next build` with same optimizations
4. Deploy to production

**Expected build output**:
```
✓ Compiled successfully
○ 15 static pages
● 6 SSG pages  
ƒ 3 dynamic routes
+ First Load JS: 156 kB
```

---

## Step 2: Monitor Core Web Vitals (1-2 hours after deploy)

### In Vercel Dashboard
1. Go to **https://vercel.com/dashboard**
2. Select **blik-studio portfolio** project
3. Click **Analytics** tab
4. View **Core Web Vitals** section

**Look for**:
- **LCP** (Largest Contentful Paint): Target < 2.5s
  - Expected improvement: ~300-500ms faster
  - If still slow: Check image loading times

- **INP** (Interaction Next Paint): Target < 200ms
  - Expected improvement: ~100-150ms faster
  - If slow: Check scroll jank in DevTools

- **CLS** (Cumulative Layout Shift): Target < 0.1
  - Should remain stable (~0.03-0.05)
  - Good indicator: no layout shifts on image load

---

## Step 3: Run Local Lighthouse Audit

### Desktop Audit
```bash
# Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Mode: Desktop
5. Throttling: No throttling
6. Report includes: Performance, Accessibility, Best Practices, SEO
```

### Mobile Audit
```bash
# Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab  
3. Click "Analyze page load"
4. Mode: Mobile
5. Throttling: Slow 4G (important!)
6. CPU Throttling: 4x slowdown
```

**Expected scores**:
- Performance: 85-90 (up from 75-80)
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

---

## Step 4: Test GSAP Lazy Loading

### Verify GSAP Only Loads on Scroll to Process
```javascript
// In Chrome DevTools Console while on homepage

// 1. Scroll to top (Process section not visible)
window.scrollTo(0, 0)

// 2. Open Network tab, filter by "gsap"
// Should see NO gsap requests yet

// 3. Scroll down to Process section
window.scrollTo(0, 3000)

// 4. Watch Network tab
// Should now see gsap.js and ScrollTrigger.js loading
// Check Timing: should be after FCP

console.log('Check: scroll to Process section and watch Network tab for GSAP loading')
```

---

## Step 5: Verify Code-Splitting

### Check Dynamic Imports in Network Tab
```
1. Open Chrome DevTools > Network tab
2. Reload page
3. Filter by Type: "script" or "fetch"
4. Scroll down and watch for new chunks loading:
   ✓ _next/static/chunks/Services-xxxx.js
   ✓ _next/static/chunks/Process-xxxx.js
   ✓ _next/static/chunks/Testimonials-xxxx.js
   ✓ _next/static/chunks/TechStack-xxxx.js
   ✓ _next/static/chunks/CTASection-xxxx.js
   ✓ _next/static/chunks/ContactSection-xxxx.js

Timeline:
- 0-2s: Hero + FeaturedProjects (critical path)
- 2-5s: Services, Process, Testimonials load as you scroll
- 5-8s: TechStack, CTA, Contact load on demand
```

---

## Step 6: Mobile Performance Test

### Low-End Device Simulation
```
1. Chrome DevTools > More tools > Sensors
2. Set Throttling:
   - Network: Slow 4G (400 kbps down / 20 kbps up)
   - CPU: 4x slowdown
3. Reload page
4. Observe:
   - FCP: Should be < 2s
   - LCP: Should be < 3s
   - Interactions: Should be responsive (no 200ms+ delay)
```

### Real Device Testing (Optional)
- Use **Lighthouse CI** or **WebPageTest**
- Test on actual iPhone/Android device via remote debugging

---

## Step 7: Bundle Analysis (Optional)

### Generate Interactive Report
```bash
cd /Users/honzik/WEBOVKY/portfolio
npm run analyze
```

This creates:
- `.next/bundles/report.html` (main bundle)
- `.next/bundles/report-client.html` (client-side)

**Open in browser**: 
```bash
open .next/bundles/report.html
```

**Look for**:
- ✅ lucide-react: Should be ~20-25 KB (tree-shaken)
- ✅ gsap: Should NOT appear in main bundle (deferred)
- ✅ framer-motion: Should be ~30-35 KB (code-split)
- ⚠️ If gsap is in main bundle, check Process.tsx import

---

## Performance Regression Alerts

### Set Up Vercel Alerts (Optional)
1. Vercel Dashboard > Project Settings > Analytics
2. Enable "Web Analytics" (free tier available)
3. Set thresholds:
   - LCP: Warn if > 3s, error if > 4s
   - INP: Warn if > 250ms
   - CLS: Warn if > 0.15

### Monitor Trends
- Daily check first week after deploy
- Weekly check for first month
- Monthly check thereafter

---

## Common Issues & Fixes

### Issue: LCP Still Slow (> 3s)
**Probable causes**:
1. Hero image not optimized (missing width/height)
2. Domine font not preloading
3. Large external script blocking render

**Fix**:
```bash
# Check image dimensions
grep -r "Image\|img" app/page.tsx components/Hero.tsx
# Ensure all <Image> tags have width/height

# Verify font preload
grep -A5 "Domine" app/layout.tsx
# Should see: preload: true
```

### Issue: Process Section Freezes on Scroll
**Probable causes**:
1. GSAP loading synchronously (should be lazy)
2. ScrollTrigger calculations too expensive

**Fix**:
```typescript
// Check components/Process.tsx has lazy loading:
const loadGSAP = async () => {
  const gsapModule = await import('gsap')
  // ...
}
// Should use requestIdleCallback
```

### Issue: Hydration Warnings
**Probable causes**:
1. isClient state not checked before rendering interactive content

**Fix**:
```typescript
// Hero.tsx should have:
const [isClient, setIsClient] = useState(false)
useEffect(() => setIsClient(true), [])

// Before rendering interactive elements:
if (!isClient) return null
```

---

## Continuous Monitoring Setup

### Weekly Performance Review
```
1. Vercel Analytics > Core Web Vitals
   - Screenshot current metrics
   - Compare week-over-week

2. Lighthouse CI (Optional)
   - Run: npm run build && npm run start
   - Local test: npx lighthouse http://localhost:3000

3. Search Console (Optional)
   - Monitor "Core Web Vitals" section
   - Check for "Poor" pages
```

### GitOps Performance
Add to git commit message before deploy:
```
perf: [Component] Optimize [metric]

Expected improvement: LCP -300ms, INP -150ms
Tested on: Desktop, Mobile (Slow 4G + 4x CPU throttle)
```

---

## Success Checklist

- [ ] Vercel deployment completes without errors
- [ ] Core Web Vitals dashboard shows improvement:
  - [ ] LCP < 2.5s
  - [ ] INP < 200ms  
  - [ ] CLS < 0.1
- [ ] Lighthouse scores: Performance 85+
- [ ] Network tab shows code-splitting (6+ chunks)
- [ ] GSAP loads only after Process section visible
- [ ] No console errors or warnings
- [ ] No hydration mismatches
- [ ] Mobile (Slow 4G) FCP < 2s, LCP < 3s

---

## Next Optimization Opportunities

### Phase 2 (If Needed)
1. **Image lazy-loading**: `loading="lazy"` on project cards
2. **Font subsetting**: Only load used characters (reduce from 32KB to 12KB)
3. **Preload hints**: `<link rel="preload">` for hero image

### Phase 3 (Advanced)
1. **Service Worker**: Offline support + aggressive caching
2. **WebAssembly**: Compile heavy calculations to WASM
3. **Edge caching**: Cloudflare Workers for intelligent caching

---

## Links & Resources

- **Vercel Analytics**: https://vercel.com/dashboard
- **Web Vitals Guide**: https://web.dev/vitals/
- **Next.js Optimization**: https://nextjs.org/docs/advanced-features/performance-bundle-analysis
- **Lighthouse Docs**: https://developers.google.com/web/tools/lighthouse
- **Chrome DevTools**: https://developer.chrome.com/docs/devtools/

---

**Note**: All metrics assume production deployment on Vercel. Local dev mode (`npm run dev`) will be slower due to lack of optimizations.
