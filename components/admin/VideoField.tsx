interface VideoFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
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

export default function VideoField({ label, value, onChange }: VideoFieldProps) {
  const embedUrl = value ? getEmbedUrl(value) : null

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
      <input
        type="text"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition focus:border-primary focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste YouTube or Vimeo URL..."
      />
      <p className="mt-1 text-xs text-gray-400">Supports YouTube and Vimeo URLs</p>
      {embedUrl ? (
        <div className="mt-2 aspect-video overflow-hidden rounded-lg">
          <iframe title="Video preview" src={embedUrl} className="h-full w-full" allowFullScreen />
        </div>
      ) : null}
    </div>
  )
}
