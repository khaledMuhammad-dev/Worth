interface AdminHeaderProps {
  title: string
  subtitle?: string
  onSave?: () => void
  saving?: boolean
}

export default function AdminHeader({ title, subtitle, onSave, saving }: AdminHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
      </div>
      {onSave ? (
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      ) : null}
    </div>
  )
}
