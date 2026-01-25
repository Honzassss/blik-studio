# Post-Deployment Checklist

## Immediate Actions (Next 5 Minutes)

- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Select **blik-studio** project
- [ ] Check **Deployments** tab
- [ ] Verify latest deployment status (should show "Ready" in green)
- [ ] Click deployment to view build logs
- [ ] Confirm no errors in logs (should see ✓ Compiled successfully)

---

## Wait & Observe (5-30 Minutes)

- [ ] **Visit production site**: https://blik-studio.cz
- [ ] Check page loads and renders correctly
- [ ] Verify no console errors (DevTools F12 > Console)
- [ ] Check all sections render (scroll through page)
- [ ] Verify dark mode toggle works (in Navbar)
- [ ] Test language switcher (EN/Czech in Footer)

---

## Performance Baseline (30-90 Minutes)

### Vercel Analytics Setup
- [ ] Dashboard > **Analytics** tab
- [ ] Wait for **Core Web Vitals** to populate (1-2 hours of traffic)
- [ ] Screenshot baseline metrics:
  - [ ] LCP: ___ ms
  - [ ] INP: ___ ms
  - [ ] CLS: ___ value

### Chrome Lighthouse Audit
```
1. Open https://blik-studio.cz
2. DevTools (F12) > Lighthouse tab
3. Mode: Mobile
4. Throttling: Slow 4G + 4x CPU throttle
5. Report: Analyze page load
6. Screenshot Performance score: ___/100
```

### Document Baseline
Save these metrics in a file for comparison:
```
BEFORE OPTIMIZATION:
- LCP: ___ ms
- INP: ___ ms
- CLS: ___
- Lighthouse Performance: ___ /100
- First Load JS: ___ kB

AFTER OPTIMIZATION (This deployment):
- LCP: ___ ms (expected: ~2100ms)
- INP: ___ ms (expected: ~120ms)
- CLS: ___ (expected: ~0.03)
- Lighthouse Performance: ___ /100 (expected: 85+)
- First Load JS: ~156 kB
```

---

## Technical Validation (1-2 Hours)

### Bundle Analysis
```bash
cd /Users/honzik/WEBOVKY/portfolio
npm run analyze
# Creates .next/bundles/report.html
# Open and verify:
# - lucide-react: ~20-25 KB (tree-shaken)
# - GSAP not in main bundle
# - framer-motion: ~30-35 KB
```
- [ ] Bundle report generated
- [ ] lucide-react properly tree-shaken
- [ ] GSAP not in main bundle

### Code-Splitting Verification
Open `https://blik-studio.cz` and follow these steps:

**Initial Load** (0-3 seconds)
```
1. DevTools > Network tab
2. Reload page
3. Observe chunks loading in order:
   ✓ main chunk (~87 KB) - GSAP, Framer Motion, shared code
   ✓ page chunk (~17 KB) - Hero + FeaturedProjects
4. Document: Initial Load Time = ___ ms
```

**Scroll to Services** (3-5 seconds)
```
1. Scroll down
2. Watch Network tab for new chunks:
   ✓ Services-xxxx.js chunk loading
3. Document: Services Load Time = ___ ms
```

**Scroll to Process** (5-8 seconds)
```
1. Continue scrolling
2. Watch Network tab for:
   ✓ Process-xxxx.js loading
   ✓ gsap.min.js loading (HERE! Not on initial load)
   ✓ ScrollTrigger.min.js loading
3. Document: GSAP Load Time = ___ ms (should be 5000+ ms)
```

**Complete Load**
```
1. Continue scrolling to bottom
2. All chunks should load:
   ✓ Testimonials chunk
   ✓ TechStack chunk
   ✓ CTASection chunk
   ✓ ContactSection chunk
3. Document: Total Load Time = ___ ms
```

- [ ] Hero + FeaturedProjects load immediately
- [ ] Services loads on scroll
- [ ] Process section triggers GSAP load (delayed!)
- [ ] GSAP NOT in initial bundle (confirmed in Network tab)

### Scroll Performance Test
```
1. DevTools > Performance tab
2. Click record
3. Scroll page smoothly up and down
4. Stop recording
5. Look for FPS in timeline:
   ✓ Should maintain 60 FPS
   ✓ No frames with > 16ms duration
```
- [ ] Smooth 60 FPS scrolling observed
- [ ] No scroll jank or frame drops
- [ ] Scroll handler not blocking

### Mobile Low-End Device Test
```
1. DevTools > More tools > Sensors
2. Set Throttling:
   - Network: Slow 4G
   - CPU: 4x slowdown
3. Reload and measure:
   - FCP (First Contentful Paint): ___ ms (target < 2000ms)
   - LCP (Largest Contentful Paint): ___ ms (target < 3000ms)
   - Interaction latency: ___ ms (target < 200ms)
```
- [ ] Mobile FCP < 2.0s
- [ ] Mobile LCP < 3.0s
- [ ] Button clicks respond < 200ms

---

## Feature Validation

### Responsive Design
- [ ] Desktop view correct (1920px+)
- [ ] Tablet view correct (768-1024px)
- [ ] Mobile view correct (< 768px)
- [ ] Hero spotlight hidden on mobile
- [ ] All text readable
- [ ] Images not stretched

### Functionality
- [ ] Navigation links work
- [ ] Dark mode toggle works
- [ ] Language switcher works (EN/CS)
- [ ] ProjectCard hover effects work
- [ ] Contact form loads (with email validation)
- [ ] Scroll animations trigger

### Edge Cases
- [ ] Page works without JavaScript (static fallback)
- [ ] Images load in AVIF/WebP format (check in DevTools)
- [ ] Fonts swap in quickly (no invisible text)
- [ ] No console errors on page load
- [ ] No hydration warnings (SSR match)

---

## Performance Debugging (If Issues)

### If LCP Still Slow (> 3s)
```
Diagnostics:
1. Check Lighthouse report for bottlenecks
2. Verify Domine font preloading:
   - DevTools > Network tab, filter "Domine"
   - Should start loading immediately
3. Check hero image size:
   - Should have width/height attributes
   - Should not exceed 200 KB

Fix:
- Ensure app/layout.tsx has: preload: true
- Run: npm run build && npm run start
```

### If GSAP Still in Main Bundle
```
Diagnostics:
1. Run: npm run analyze
2. Open .next/bundles/report.html
3. Search for "gsap" or "ScrollTrigger"
4. Should NOT appear in main chunk

Fix:
- Check components/Process.tsx import
- Should NOT have: import gsap from 'gsap'
- Should have: const gsapModule = await import('gsap')
```

### If Hydration Errors in Console
```
Diagnostics:
1. Check browser console for hydration warnings
2. Note which component causes error

Fix:
- Add isClient state to that component
- Wrap interactive content: if (!isClient) return null
```

### If Scroll is Janky on Mobile
```
Diagnostics:
1. Check DevTools Performance on throttled device
2. Look for long tasks (> 50ms)
3. Check scroll listener timing

Fix:
- Verify Navbar.tsx has RAF throttle
- Check for requestAnimationFrame: ticking flag
- Ensure { passive: true } on event listener
```

---

## Long-Term Monitoring

### Weekly Check (For First Month)
```
1. Vercel Analytics > Core Web Vitals
2. Compare metrics:
   - LCP week 1 vs week 2
   - INP trend (should be stable)
   - CLS trend (should be stable)
3. Document any regression
4. Check for error messages in logs
```

### Monthly Check
```
1. Run Lighthouse audit
2. Document Performance score
3. Compare bundle size (npm run analyze)
4. Check Vercel deployment history
5. Review git commits for changes
```

### Quarterly Deep Dive
```
1. Full performance audit with WebPageTest
2. Test on real low-end device (iPhone SE, budget Android)
3. Compare to competitors
4. Plan Phase 2 optimizations
```

---

## Success Criteria

### ✅ Deployment Success
- [ ] Vercel build completes without errors
- [ ] Site loads and renders correctly
- [ ] No console errors or warnings
- [ ] All routes accessible

### ✅ Code-Splitting Success
- [ ] 6 sections load dynamically
- [ ] GSAP loads only when scrolling to Process
- [ ] Initial bundle ~156 KB
- [ ] No GSAP in main bundle

### ✅ Performance Success
- [ ] LCP < 2.5s (target)
- [ ] INP < 200ms (target)
- [ ] CLS < 0.1 (target)
- [ ] Lighthouse Performance 85+ (target)

---

## Documentation Files

All performance details in:
- **[PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)** - Technical details of each optimization
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment & monitoring
- **[OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md)** - Summary of all changes made
- **[POST_DEPLOYMENT_CHECKLIST.md](./POST_DEPLOYMENT_CHECKLIST.md)** - This file

---

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Production Site**: https://blik-studio.cz
- **GitHub Repository**: https://github.com/Honzassss/blik-studio
- **Vercel Analytics**: https://vercel.com/dashboard > [Project] > Analytics
- **Lighthouse**: Chrome DevTools (F12) > Lighthouse tab
- **Bundle Analyzer**: Run `npm run analyze` locally

---

## Notes & Issues

### Issues Found
(Document any issues here as you discover them)

```
Issue: [Description]
Date: [Date]
Severity: [High/Medium/Low]
Fix Applied: [What you did]
Result: [Outcome]
```

### Decisions Made
(Track any decisions or pivots)

```
Decision: [What was decided]
Reason: [Why]
Date: [Date]
Owner: [Who made it]
```

---

**Last Updated**: [Today's Date]
**Status**: ✅ Production Deployed - Awaiting Performance Data
**Next Review**: [In 1-2 hours when Core Web Vitals populate]
