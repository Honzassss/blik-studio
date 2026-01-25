'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { Project } from '@/lib/projects'

interface ProjectGridProps {
  projects: Project[]
  showFilters?: boolean
}

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'saas', label: 'SaaS' },
  { id: 'app', label: 'Apps' },
]

export default function ProjectGrid({ projects, showFilters = false }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 dark:bg-[#1f1b18] hover:bg-primary-200 dark:hover:bg-[#27221d]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  )
}
