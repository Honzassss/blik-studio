'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden rounded-xl bg-primary-100 dark:bg-[#1f1b18] aspect-[16/10] mb-4 border border-primary-100 dark:border-[#2a2520]">
          <Image
            src={project.image}
            alt={`${project.title} cover`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent" />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                aria-label="View live site"
              >
                <ExternalLink className="w-5 h-5 text-gray-900" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5 text-gray-900" />
              </a>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {project.year}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-200 mb-3">
            {project.description}
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-primary-600">
              {project.outcome}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-[#1f1b18] border border-primary-100 dark:border-[#2a2520] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
