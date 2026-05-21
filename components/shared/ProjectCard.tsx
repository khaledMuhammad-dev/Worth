'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  tags: string[];
  image: string;
  slug: string;
  viewLabel: string;
}

export function ProjectCard({ title, tags, image, slug, viewLabel }: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block bg-white rounded-xl border border-[#F0F0F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden aspect-video bg-[#F9FAFB]">
        <div
          className="w-full h-full bg-gradient-to-br from-[#FFF4EE] to-[#F97316]/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: image ? `url(${image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {!image && (
            <span className="text-[#F97316]/40 text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>W</span>
          )}
        </div>
        <div className="absolute inset-0 bg-[#1A1A2E]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="text-white font-semibold">{viewLabel}</span>
          <ArrowUpRight className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#1A1A2E] text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs bg-[#FFF4EE] text-[#F97316] px-2.5 py-1 rounded-full font-medium">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
