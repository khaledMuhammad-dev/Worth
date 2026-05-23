interface VideoEmbedProps {
  url: string
}

function getEmbedUrl(url: string): string | null {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (match) return `https://www.youtube.com/embed/${match[1]}`
  }

  if (url.includes('vimeo.com')) {
    const match = url.match(/vimeo\.com\/(\d+)/)
    if (match) return `https://player.vimeo.com/video/${match[1]}`
  }

  return null
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(url)

  if (!embedUrl) return null

  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-xl shadow-md">
      <iframe
        title="Embedded video"
        src={embedUrl}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
