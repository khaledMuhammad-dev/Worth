import { getContentData } from '@/lib/content'
import type { WorkData } from '@/lib/types/content'
import { notFound } from 'next/navigation'
import ProjectPageClient from './ProjectPageClient'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const work = getContentData<WorkData>('work')
  return work.projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = getContentData<WorkData>('work')
  const currentIndex = work.projects.findIndex((project) => project.slug === slug)
  if (currentIndex === -1) notFound()

  const project = work.projects[currentIndex]
  const nextProject = work.projects[(currentIndex + 1) % work.projects.length]

  return <ProjectPageClient project={project} nextProject={nextProject} />
}
