'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface UserFiltersProps {
  onFiltersChange: (filters: {
    search?: string
    role?: string
    isActive?: boolean
  }) => void
}

export function UserFilters({ onFiltersChange }: UserFiltersProps) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [isActive, setIsActive] = useState('')

  const handleChange = (
    newSearch = search,
    newRole = role,
    newIsActive = isActive
  ) => {
    onFiltersChange({
      search: newSearch || undefined,
      role: newRole || undefined,
      isActive: newIsActive === '' ? undefined : newIsActive === 'true',
    })
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="search"
        placeholder={t('admin.users.searchPlaceholder')}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          handleChange(e.target.value, role, isActive)
        }}
        className="flex-1 min-w-48 rounded-lg border px-3 py-2 text-sm
          dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground
          dark:placeholder:text-sop-subtle"
      />

      <select
        value={role}
        onChange={(e) => {
          setRole(e.target.value)
          handleChange(search, e.target.value, isActive)
        }}
        className="rounded-lg border px-3 py-2 text-sm
          dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground"
      >
        <option value="">{t('admin.users.allRoles')}</option>
        <option value="super_admin">{t('admin.users.superAdmin')}</option>
        <option value="admin">{t('admin.users.admin')}</option>
      </select>

      <select
        value={isActive}
        onChange={(e) => {
          setIsActive(e.target.value)
          handleChange(search, role, e.target.value)
        }}
        className="rounded-lg border px-3 py-2 text-sm
          dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground"
      >
        <option value="">{t('admin.users.allStatus')}</option>
        <option value="true">{t('admin.users.active')}</option>
        <option value="false">{t('admin.users.inactive')}</option>
      </select>
    </div>
  )
}
