interface LocaleFieldProps {
  labelEN: string
  labelAR: string
  valueEN: string
  valueAR: string
  onChangeEN: (value: string) => void
  onChangeAR: (value: string) => void
  multiline?: boolean
}

export default function LocaleField({
  labelEN,
  labelAR,
  valueEN,
  valueAR,
  onChangeEN,
  onChangeAR,
  multiline,
}: LocaleFieldProps) {
  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition focus:border-primary focus:outline-none'

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">{labelEN} (EN)</label>
        {multiline ? (
          <textarea
            dir="ltr"
            className={`${inputClass} min-h-24 resize-y`}
            value={valueEN}
            onChange={(event) => onChangeEN(event.target.value)}
            placeholder="English..."
          />
        ) : (
          <input
            dir="ltr"
            type="text"
            className={inputClass}
            value={valueEN}
            onChange={(event) => onChangeEN(event.target.value)}
            placeholder="English..."
          />
        )}
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">{labelAR} (AR)</label>
        {multiline ? (
          <textarea
            dir="rtl"
            className={`${inputClass} min-h-24 resize-y font-arabic`}
            value={valueAR}
            onChange={(event) => onChangeAR(event.target.value)}
            placeholder="العربية..."
          />
        ) : (
          <input
            dir="rtl"
            type="text"
            className={`${inputClass} font-arabic`}
            value={valueAR}
            onChange={(event) => onChangeAR(event.target.value)}
            placeholder="العربية..."
          />
        )}
      </div>
    </div>
  )
}
