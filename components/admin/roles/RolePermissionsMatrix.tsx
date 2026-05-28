'use client'

import { useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRolesQuery } from '@/hooks/queries/useRolesQuery'
import { useUpdateRolePerms } from '@/hooks/mutations/useUpdateRolePerms'
import { usePermissionsStore } from '@/stores/permissions.store'
import { useUIStore } from '@/stores/ui.store'
import { ALL_PERMISSIONS, PERMISSION_GROUPS } from '@/lib/rbac/permissions'

export function RolePermissionsMatrix() {
  const { t } = useTranslation()
  const { data: roles, isLoading } = useRolesQuery()
  const updateRolePerms = useUpdateRolePerms()
  const rolePermissions = usePermissionsStore((s) => s.rolePermissions)
  const setUnsavedChanges = useUIStore((s) => s.setUnsavedChanges)

  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [pendingChanges, setPendingChanges] = useState<
    Record<string, Record<string, boolean>>
  >({})

  const filteredPermissions = useMemo(() => {
    return Object.entries(ALL_PERMISSIONS).filter(([, perm]) => {
      const matchesSearch = perm.label.toLowerCase().includes(search.toLowerCase())
      const matchesGroup = !activeGroup || perm.group === activeGroup
      return matchesSearch && matchesGroup
    })
  }, [search, activeGroup])

  const handleToggle = useCallback(
    (roleId: string, permissionKey: string, checked: boolean) => {
      if (roleId === 'super_admin') return

      setPendingChanges((prev) => ({
        ...prev,
        [roleId]: { ...(prev[roleId] ?? {}), [permissionKey]: checked },
      }))
      setUnsavedChanges('roles', true)
    },
    [setUnsavedChanges]
  )

  const handleSaveAll = async () => {
    for (const [roleId, changes] of Object.entries(pendingChanges)) {
      const currentPerms = rolePermissions[roleId] ?? []
      const newPerms = [...currentPerms]
      for (const [perm, granted] of Object.entries(changes)) {
        if (granted && !newPerms.includes(perm)) newPerms.push(perm)
        if (!granted) {
          const idx = newPerms.indexOf(perm)
          if (idx !== -1) newPerms.splice(idx, 1)
        }
      }
      await updateRolePerms.mutateAsync({ roleId, permissions: newPerms })
    }
    setPendingChanges({})
    setUnsavedChanges('roles', false)
  }

  const isGranted = (roleId: string, permKey: string): boolean => {
    const pending = pendingChanges[roleId]?.[permKey]
    if (pending !== undefined) return pending
    return (rolePermissions[roleId] ?? []).includes(permKey)
  }

  const pendingCount = Object.values(pendingChanges)
    .flatMap(Object.keys).length

  if (isLoading) {
    return <div className="animate-pulse h-96 rounded-xl dark:bg-sop-surface" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.roles.searchPlaceholder')}
            className="rounded-lg border px-3 py-2 text-sm w-64
              dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground
              dark:placeholder:text-sop-subtle"
          />
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setActiveGroup(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${!activeGroup
                  ? 'bg-primary text-white'
                  : 'dark:bg-sop-surface dark:text-sop-muted'
                }`}
            >
              {t('admin.roles.allFilter')}
            </button>
            {PERMISSION_GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(activeGroup === group ? null : group)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                  ${activeGroup === group
                    ? 'bg-primary text-white'
                    : 'dark:bg-sop-surface dark:text-sop-muted'
                  }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
        {pendingCount > 0 && (
          <button
            onClick={handleSaveAll}
            disabled={updateRolePerms.isPending}
            className="flex items-center gap-2 bg-primary text-white
              rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            {t('admin.roles.saveChanges')}
            <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
              {pendingCount}
            </span>
          </button>
        )}
      </div>

      <div className="rounded-xl border dark:border-sop-border overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="dark:bg-sop-elevated border-b dark:border-sop-border">
              <th className="text-left px-4 py-3 font-semibold dark:text-sop-foreground w-1/2">
                {t('admin.roles.permissionColumn')}
              </th>
              <th className="text-center px-4 py-3 font-semibold dark:text-sop-foreground w-1/4">
                {t('admin.roles.superAdminColumn')}
                <span className="block text-xs font-normal dark:text-sop-subtle">
                  {t('admin.roles.superAdminNote')}
                </span>
              </th>
              <th className="text-center px-4 py-3 font-semibold dark:text-sop-foreground w-1/4">
                {t('admin.roles.adminColumn')}
              </th>
            </tr>
          </thead>
          <tbody>
            {PERMISSION_GROUPS.filter((g) => !activeGroup || g === activeGroup).map((group) => {
              const groupPerms = filteredPermissions.filter(([, p]) => p.group === group)
              if (groupPerms.length === 0) return null
              return (
                <>
                  <tr
                    key={`group-${group}`}
                    className="dark:bg-sop-bg border-b dark:border-sop-border"
                  >
                    <td colSpan={3} className="px-4 py-2">
                      <span className="text-xs font-bold uppercase tracking-wider dark:text-sop-purple">
                        {group}
                      </span>
                    </td>
                  </tr>
                  {groupPerms.map(([key, perm]) => (
                    <tr
                      key={key}
                      className="border-b dark:border-sop-border dark:hover:bg-sop-hover transition-colors"
                    >
                      <td className="px-4 py-3 dark:text-sop-foreground">{perm.label}</td>
                      <td
                        className="text-center px-4 py-3"
                        data-role="super_admin"
                        data-permission={key}
                      >
                        <input
                          type="checkbox"
                          checked
                          disabled
                          className="accent-primary cursor-not-allowed opacity-60"
                        />
                      </td>
                      <td
                        className="text-center px-4 py-3"
                        data-role="admin"
                        data-permission={key}
                      >
                        <input
                          type="checkbox"
                          checked={isGranted('admin', key)}
                          onChange={(e) => handleToggle('admin', key, e.target.checked)}
                          className="accent-primary cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
