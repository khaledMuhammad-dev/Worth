/* eslint-disable @next/next/no-img-element */
interface ImageFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function ImageField({ label, value, onChange }: ImageFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
      <input
        type="text"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition focus:border-primary focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste image URL (Cloudinary recommended)..."
      />
      {value ? (
        <div className="mt-2 flex max-h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-surface">
          <img src={value} alt="Preview" className="max-h-40 object-contain" />
        </div>
      ) : null}
    </div>
  )
}
