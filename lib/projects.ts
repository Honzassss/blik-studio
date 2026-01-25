export interface Project {
  slug: string
  title: string
  description: string
  outcome: string
  tags: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'web' | 'saas' | 'app'
  year: number
  client?: string
  problem?: string
  solution?: string
  results?: string[]
  gallery?: string[]
  tech?: string[]
}

export const projects: Project[] = [
  {
    slug: 'stubnerhof-website',
    title: 'Hotel Stubnerhof Website',
    description: 'WordPress + Elementor site built for easy editing by the owner, with SEO and multilingual support.',
    outcome: 'Improved SEO performance and increased online reservations',
    tags: ['WordPress', 'Elementor', 'SEO', 'Multilingual'],
    image: '/projects/stubnerhof.webp',
    liveUrl: 'https://stubnerhof.at/',
    featured: true,
    category: 'web',
    year: 2025,
    client: 'Hotel Stubnerhof',
    problem: 'The website needed a modern design, better discoverability, and an editing workflow the owner could manage without developers.',
    solution: 'Designed and built a WordPress + Elementor site with improved structure, multilingual setup, and SEO-focused pages.',
    results: [
      'SEO score improved (Lighthouse/SEO target: 100)',
      'Stronger online presence',
      'Increase in online reservations'
    ],
    tech: ['WordPress', 'Elementor', 'Polylang/WPML (if used)', 'SEO tooling'],
    gallery: ['/projects/stubnerhof.webp', '/projects/stubnerhof-1.webp', '/projects/Stubnerhof-2.webp']
  },

  {
    slug: 'bks-hotel-digitization',
    title: 'Hotel Digitization & Reservation System',
    description: 'Digitization project for a hotel group including online booking, online check-in, smart locks, and on-site network improvements.',
    outcome: 'Fewer booking errors and reduced operational load',
    tags: ['Hospitality', 'Booking', 'Online Check-in', 'Smart Locks', 'Networking'],
    image: '/projects/bks.webp',
    featured: true,
    category: 'saas',
    year: 2025,
    client: 'Private client (EU)',
    problem: 'High operational load and booking mistakes created unnecessary calls, manual work, and staffing pressure at reception.',
    solution: 'Implemented a digital guest flow (online booking + online check-in), improved infrastructure, and integrated smart access to reduce manual processes.',
    results: [
      '~50% fewer booking errors',
      '~70% fewer calls',
      'Reduced need for a full-time reception role'
    ],
    tech: [
      'System integration',
      'On-site network setup',
      'Smart lock + access workflow',
      'Booking/check-in platform configuration'
    ],
    gallery: ['/projects/bks.webp', '/projects/bks-1.webp']
  },

  {
    slug: 'fitconnect-ios',
    title: 'FitConnect (iOS)',
    description: 'iOS app that connects fitness smart devices into one place to help users track progress and support weight loss goals.',
    outcome: 'Private iOS build (dev mode) with Firebase + API integrations',
    tags: ['iOS', 'Swift/Xcode', 'Firebase', 'APIs'],
    image: '/projects/fitconnect.webp',
    featured: true,
    category: 'app',
    year: 2025,
    client: 'Personal project',
    problem: 'Fitness data is split across multiple devices and platforms, making it hard for users to track progress and stay consistent.',
    solution: 'Built an iOS app that aggregates device data through APIs and stores it in a structured backend for easy progress monitoring.',
    results: [
      'Device data centralized into one dashboard',
      'API + database integration for consistent tracking',
      'Designed for future public release'
    ],
    tech: ['Xcode', 'Firebase', 'APIs', 'Database'],
    gallery: ['/projects/fitconnect.webp', '/projects/fitconnect-1.webp', '/projects/fitconnect-2.webp']
  },

  {
    slug: 'torvik-lights-website-admin',
    title: 'Törvik-Lights Website + News Admin',
    description: 'Laravel + MySQL website with an admin/news panel so the owner can publish updates without coding.',
    outcome: 'Owner can add articles via /admin (not publicly listed)',
    tags: ['Laravel', 'MySQL', 'PHP', 'Admin Panel'],
    image: '/projects/torvik.webp',
    liveUrl: 'https://törvik-lights.com/cs',
    featured: true,
    category: 'web',
    year: 2025,
    client: 'Törvik-Lights',
    problem: 'Client needed a simple way to publish news and updates without editing code, plus smoother hosting/admin workflow.',
    solution: 'Implemented a secure admin panel for creating and publishing news posts and integrated it into the live site.',
    results: [
      'News publishing without developer involvement',
      'Cleaner content workflow for updates',
      'Integrated with existing hosting setup'
    ],
    tech: ['Laravel', 'MySQL', 'PHP'],
    gallery: ['/projects/torvik.webp', '/projects/torvik-1.webp', '/projects/torvik-2.webp']
  },

  {
    slug: 'haslinger-website',
    title: 'Alpenpension Haslinger Website',
    description: 'WordPress + Elementor site built for owner-managed edits, SEO, and multilingual content.',
    outcome: 'Improved online presence and increased reservations',
    tags: ['WordPress', 'Elementor', 'SEO', 'Multilingual'],
    image: '/projects/Haslinger.webp',
    liveUrl: 'https://alpenpension-haslinger.com/',
    featured: false,
    category: 'web',
    year: 2025,
    client: 'Alpenpension Haslinger',
    problem: 'The property needed a modern web presence that converts visitors into reservations and is easy to update.',
    solution: 'Designed and built a multilingual WordPress site with improved structure, SEO, and owner-friendly editing.',
    results: [
      'More online visibility',
      'Increase in reservations (reported ~30%)',
      'Higher share of bookings coming through online channels'
    ],
    tech: ['WordPress', 'Elementor', 'Polylang/WPML (if used)', 'SEO tooling'],
    gallery: ['/projects/Haslinger.webp', '/projects/Haslinger-1.webp']
  },

  {
    slug: 'kidscalling-ios',
    title: 'KidsCalling (iOS)',
    description: 'iOS app for kids who love calling — with prerecorded voices so they can have fun without disturbing real people.',
    outcome: 'Ready for release (App Store link pending)',
    tags: ['iOS', 'Swift', 'App'],
    image: '/projects/kidcalling.webp',
    featured: false,
    category: 'app',
    year: 2025,
    client: 'Personal project',
    problem: 'Kids often want to call repeatedly, which can disturb family members or lead to calling real people unintentionally.',
    solution: 'Built a kid-friendly calling experience using prerecorded voice responses to simulate conversations safely.',
    results: [
      'No calls to real people',
      'Fun, repeatable "calling" experience for kids',
      'Built for simple, safe usage'
    ],
    tech: ['Swift', 'iOS'],
    gallery: ['/projects/kidcalling.webp', '/projects/kidscalling-1.webp', '/projects/kidscalling-2.webp']
  }
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug)
export const getProjectsByCategory = (category: string) =>
  category === 'all' ? projects : projects.filter(p => p.category === category)
