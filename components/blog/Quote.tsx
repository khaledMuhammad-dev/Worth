interface QuoteProps {
  author: string
  children: React.ReactNode
}

export default function Quote({ author, children }: QuoteProps) {
  return (
    <blockquote className="my-8 border-s-4 border-primary ps-6">
      <div className="font-serif text-6xl leading-none text-primary/20">“</div>
      <p className="-mt-6 text-lg italic leading-relaxed text-foreground">{children}</p>
      <footer className="mt-3 text-sm font-medium text-muted">— {author}</footer>
    </blockquote>
  )
}
