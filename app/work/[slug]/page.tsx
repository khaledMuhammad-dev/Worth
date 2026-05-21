import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';
import { getProjectBySlug, projects } from '@/lib/site-data';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'Project Not Found | Worth Agency' };
  }

  return {
    title: `${project.title} | Worth Agency`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const nextProject = getProjectBySlug(project.nextSlug) ?? projects[0];

  return <ProjectPageClient project={project} nextProject={nextProject} />;
}
