'use client'

import SectionHeading from '@/components/SectionHeading'
import ProjectGrid from '@/components/ProjectGrid'
import { projects } from '@/lib/projects'
import { useI18n } from '@/lib/i18n'

export default function ProjectsPage() {
  const { t } = useI18n()
  
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <SectionHeading
          title={t.allProjectsPage?.title || 'All Projects'}
          subtitle={t.allProjectsPage?.subtitle || 'A collection of projects I\'ve worked on, from concept to launch.'}
        />
        
        <ProjectGrid projects={projects} showFilters={true} />
      </div>
    </div>
  )
}
