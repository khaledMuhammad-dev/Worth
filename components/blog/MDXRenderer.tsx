import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Callout from './Callout'
import CloudinaryImage from './CloudinaryImage'
import Quote from './Quote'
import VideoEmbed from './VideoEmbed'

const components = {
  VideoEmbed,
  CloudinaryImage,
  Callout,
  Quote,
}

interface MDXRendererProps {
  source: MDXRemoteSerializeResult
}

export default function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-code:rounded prose-code:bg-orange-50 prose-code:px-1">
      <MDXRemote {...source} components={components} />
    </div>
  )
}
