import type { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import ProjectGrid from '@/components/ProjectGrid'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projekty',
  description: 'Podívejte se na můj portfolio projektů webového vývoje, od e-commerce platforem až po SaaS aplikace.',
}

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <SectionHeading
          title="All Projects"
          subtitle="A collection of projects I've worked on, from concept to launch."
        />
        
        <ProjectGrid projects={projects} showFilters={true} />
      </div>
    </div>
  )
}
