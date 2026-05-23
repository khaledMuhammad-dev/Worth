/* eslint-disable @next/next/no-img-element */
interface CloudinaryImageProps {
  src: string
  alt: string
  caption?: string
}

export default function CloudinaryImage({ src, alt, caption }: CloudinaryImageProps) {
  return (
    <figure className="my-8">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-surface">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      {caption ? <figcaption className="mt-2 text-center text-sm italic text-muted">{caption}</figcaption> : null}
    </figure>
  )
}
