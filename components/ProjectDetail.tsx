'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react'
import { Project } from '@/lib/projects'
import { useI18n } from '@/lib/i18n'

interface ProjectDetailProps {
  project: Project
  nextProject: Project
  currentIndex: number
}

export default function ProjectDetail({ project, nextProject, currentIndex }: ProjectDetailProps) {
  const { t } = useI18n()
  
  // Get translated project details
  const projectTranslations = t.projects?.items?.[project.slug as keyof typeof t.projects.items] || {}
  const title = projectTranslations.title || project.title
  const description = projectTranslations.description || project.description
  const problem = projectTranslations.problem || project.problem
  const solution = projectTranslations.solution || project.solution
  const results = projectTranslations.results || project.results
  
  // Get translated next project title
  const nextProjectTranslations = t.projects?.items?.[nextProject.slug as keyof typeof t.projects.items] || {}
  const nextProjectTitle = nextProjectTranslations.title || nextProject.title

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.projectDetail?.backToProjects || 'Back to Projects'}
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

          <h1 className="mb-4">{title}</h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t.projectDetail?.viewLiveSite || 'View Live Site'}
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
                {t.projectDetail?.viewOnGithub || 'View on GitHub'}
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
                  alt={`${title} screenshot ${idx + 1}`}
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
            {problem && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{t.projectDetail?.challenge || 'The Challenge'}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {problem}
                </p>
              </div>
            )}

            {/* Solution */}
            {solution && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{t.projectDetail?.solution || 'The Solution'}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {solution}
                </p>
              </div>
            )}

            {/* Results */}
            {results && results.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{t.projectDetail?.results || 'The Results'}</h2>
                <ul className="space-y-3">
                  {results.map((result, index) => (
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
          <div>
            {/* Tech Stack */}
            {project.tech && project.tech.length > 0 && (
              <div className="sticky top-32 bg-primary-50 dark:bg-[#221e1a] border border-primary-100 dark:border-[#2a2520] p-6 rounded-xl">
                <h3 className="font-semibold mb-4">{t.projectDetail?.tech || 'Tech Stack'}</h3>
                <ul className="space-y-2">
                  {project.tech.map((tech) => (
                    <li key={tech} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Client */}
            {project.client && (
              <div className="mt-6 bg-primary-50 dark:bg-[#221e1a] border border-primary-100 dark:border-[#2a2520] p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Client</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{project.client}</p>
              </div>
            )}

            {/* Year */}
            {project.year && (
              <div className="mt-6 bg-primary-50 dark:bg-[#221e1a] border border-primary-100 dark:border-[#2a2520] p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Year</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{project.year}</p>
              </div>
            )}
          </div>
        </div>

        {/* Next project */}
        <div className="border-t border-primary-100 dark:border-[#2a2520] pt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
            {t.projectDetail?.nextProject || 'Next Project'}
          </p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between py-6 px-6 bg-primary-50 dark:bg-[#221e1a] border border-primary-100 dark:border-[#2a2520] rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold group-hover:translate-x-2 transition-transform">
                {nextProjectTitle}
              </h3>
            </div>
            <ArrowRight className="w-6 h-6 text-primary-600 group-hover:translate-x-2 transition-transform flex-shrink-0 ml-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
