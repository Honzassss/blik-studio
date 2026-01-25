import { Code2, Palette, Zap, Shield, Smartphone, Search } from 'lucide-react'

export const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern frameworks like Next.js, React, and TypeScript.',
    outcomes: ['Fast performance', 'SEO optimized', 'Scalable architecture']
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love and that drive conversions.',
    outcomes: ['User research', 'Wireframing', 'High-fidelity mockups']
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps with React Native that work seamlessly on iOS and Android.',
    outcomes: ['Native performance', 'Single codebase', 'App store deployment']
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed up your existing website with advanced optimization techniques.',
    outcomes: ['Core Web Vitals', 'Lighthouse 90+', 'Faster load times']
  },
  {
    icon: Search,
    title: 'SEO & Marketing',
    description: 'Technical SEO, content strategy, and analytics to increase organic traffic.',
    outcomes: ['Higher rankings', 'More traffic', 'Better conversions']
  },
  {
    icon: Shield,
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance, updates, and technical support for peace of mind.',
    outcomes: ['24/7 monitoring', 'Regular updates', 'Security patches']
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start with a deep dive into your business goals, target audience, and technical requirements.',
    image: '/process/discovery.webp',
  },
  {
    number: '02',
    title: 'Design & Planning',
    description: 'I create wireframes and mockups, then plan the technical architecture for your approval.',
    image: '/process/design.webp',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Building your project with clean code, regular updates, and continuous testing.',
    image: '/process/development.webp',
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'Deploy to production, monitor performance, and provide ongoing support as needed.',
    image: '/process/launch.webp',
  },
]

export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Fashion Brand Co.',
    content: 'Working with them was a game-changer for our business. Our new e-commerce platform increased sales by 156% in just three months.',
    avatar: '/avatars/sarah.jpg',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CTO, DataMetrics Inc.',
    content: 'Exceptional technical skills and great communication. The dashboard they built became our product\'s core feature.',
    avatar: '/avatars/michael.jpg',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Founder, FitLife',
    content: 'Not only did they deliver a beautiful app, but they also provided valuable insights on UX that improved our retention by 40%.',
    avatar: '/avatars/emma.jpg',
    rating: 5
  },
  {
    name: 'David Park',
    role: 'Marketing Director, Creative Co.',
    content: 'Our new portfolio site won awards and tripled our inbound leads. The attention to detail and performance is outstanding.',
    avatar: '/avatars/david.jpg',
    rating: 5
  },
]

export const techStack = [
  { id: 'nextjs', name: 'Next.js', category: 'frontend', description: 'The React framework for production-grade applications. Next.js gives you the best developer experience with built-in server-side rendering, static generation, TypeScript support, smart bundling, route pre-fetching, and more. Zero config needed.' },
  { id: 'react', name: 'React', category: 'frontend', description: 'A JavaScript library for building user interfaces with component-based architecture. React makes it painless to create interactive UIs with efficient updates and rendering. Build encapsulated components that manage their own state, then compose them to make complex UIs.' },
  { id: 'typescript', name: 'TypeScript', category: 'language', description: 'TypeScript is JavaScript with syntax for types. It\'s a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Catch errors early in your editor and refactor code with confidence.' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'styling', description: 'A utility-first CSS framework for rapidly building custom user interfaces. Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML. Highly composable and easy to maintain.' },
  { id: 'nodejs', name: 'Node.js', category: 'backend', description: 'Node.js is an open-source, cross-platform JavaScript runtime environment. It executes JavaScript code outside a web browser and is designed to build scalable network applications. Perfect for building fast, scalable server-side and networking applications.' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', description: 'The world\'s most advanced open source relational database. PostgreSQL is a powerful, enterprise-class database system with proven architecture, reliability, data integrity, and robust feature set. Perfect for complex queries and large-scale applications.' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', description: 'A document-oriented NoSQL database used for high volume data storage. MongoDB provides high performance, high availability, and automatic scaling. Its flexible schema makes it perfect for rapidly evolving applications and unstructured data.' },
  { id: 'redis', name: 'Redis', category: 'database', description: 'An open source in-memory data structure store used as a database, cache, and message broker. Redis supports various data structures and provides sub-millisecond latency. Ideal for real-time applications, caching, and session management.' },
  { id: 'laravel', name: 'Laravel', category: 'backend', description: 'A web application framework with expressive, elegant syntax. Laravel attempts to take the pain out of development by easing common tasks used in most web projects. It provides powerful tools for routing, sessions, caching, and authentication.' },
  { id: 'react-native', name: 'React Native', category: 'mobile', description: 'Create native apps for Android and iOS using React. React Native combines the best parts of native development with React. Write your app in JavaScript and React and get truly native UI components and performance across platforms.' },
  { id: 'framer-motion', name: 'Framer Motion', category: 'animation', description: 'A production-ready motion library for React. Framer Motion makes it simple to create complex animations and interactions with a declarative API. Includes spring physics, variants, gestures, and full TypeScript support.' },
  { id: 'aws', name: 'AWS', category: 'cloud', description: 'Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services. From compute power to database storage to content delivery, AWS provides a comprehensive suite of services to help businesses scale and grow.' },
  { id: 'docker', name: 'Docker', category: 'devops', description: 'Docker is an open platform for developing, shipping, and running applications. It enables you to separate your applications from your infrastructure and treat your infrastructure like a managed application. Package software into standardized units for development, shipment and deployment.' },
  { id: 'git', name: 'Git', category: 'tools', description: 'Git is a free and open source distributed version control system. It\'s designed to handle everything from small to very large projects with speed and efficiency. Git is easy to learn and has a tiny footprint with lightning fast performance.' },
  { id: 'figma', name: 'Figma', category: 'design', description: 'A collaborative interface design tool for teams. Figma makes it easy to create, test, and share designs from start to finish. With features like real-time collaboration, prototyping, and developer handoff, Figma is the complete design platform.' },
]

export const skills = [
  'Frontend Development',
  'Backend Development',
  'Full-Stack Architecture',
  'UI/UX Design',
  'Mobile Development',
  'Performance Optimization',
  'SEO & Analytics',
  'DevOps & CI/CD',
  'Database Design',
  'API Development',
  'Code Review',
  'Technical Leadership',
]
