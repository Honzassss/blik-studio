import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react'
import { getProjectBySlug, projects } from '@/lib/projects'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex(p => p.slug === params.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Project header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-4">{project.title}</h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                View Live Site
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 dark:bg-[#1f1b18] rounded-lg hover:bg-primary-200 dark:hover:bg-[#27221d] transition-colors border border-primary-100 dark:border-[#2a2520]"
              >
                View on GitHub
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {project.gallery.map((src, idx) => (
              <div key={src} className="relative aspect-[16/9] overflow-hidden rounded-xl border border-primary-100 dark:border-[#2a2520]">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Project details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-12">
            {/* Problem */}
            {project.problem && (
              <div>
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div>
                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">The Results</h2>
                <ul className="space-y-3">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 text-xl font-bold">✓</span>
                      <span className="text-gray-600 dark:text-gray-300 text-lg">
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project info */}
            <div className="p-6 bg-primary-50 dark:bg-[#1f1b18] rounded-xl border border-primary-100 dark:border-[#2a2520]">
              <h3 className="font-semibold mb-4">Project Info</h3>
              <dl className="space-y-3">
                {project.client && (
                  <>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Client</dt>
                    <dd className="font-medium">{project.client}</dd>
                  </>
                )}
                <dt className="text-sm text-gray-600 dark:text-gray-400">Year</dt>
                <dd className="font-medium">{project.year}</dd>
                <dt className="text-sm text-gray-600 dark:text-gray-400">Category</dt>
                <dd className="font-medium capitalize">{project.category}</dd>
              </dl>
            </div>

            {/* Tech stack */}
            {project.tech && project.tech.length > 0 && (
              <div className="p-6 bg-primary-50 dark:bg-[#1f1b18] rounded-xl border border-primary-100 dark:border-[#2a2520]">
                <h3 className="font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-white dark:bg-[#27221d] border border-primary-100 dark:border-[#2a2520] rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next project */}
        <div className="border-t border-primary-100 dark:border-[#2a2520] pt-12">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            Next Project
          </h3>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between p-6 bg-primary-50 dark:bg-[#1f1b18] rounded-xl hover:bg-primary-100 dark:hover:bg-[#27221d] transition-colors border border-primary-100 dark:border-[#2a2520]"
          >
            <div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {nextProject.description}
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  )
}
