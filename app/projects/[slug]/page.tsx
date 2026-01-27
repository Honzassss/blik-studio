import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, projects } from '@/lib/projects'
import ProjectDetail from '@/components/ProjectDetail'

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

  return <ProjectDetail project={project} nextProject={nextProject} currentIndex={currentIndex} />
}
