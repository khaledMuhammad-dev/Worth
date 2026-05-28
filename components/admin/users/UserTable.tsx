'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUsersQuery } from '@/hooks/queries/useUsersQuery'
import { useDeleteUser } from '@/hooks/mutations/useDeleteUser'
import { useUIStore } from '@/stores/ui.store'
import { useCurrentUser } from '@/stores/auth.store'
import type { AdminUser } from '@/lib/rbac/types'

interface UserTableProps {
  filters?: {
    role?: string
    isActive?: boolean
    search?: string
    page?: number
  }
  onEdit?: (user: AdminUser) => void
}

export function UserTable({ filters = {}, onEdit }: UserTableProps) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const { data, isLoading, isError } = useUsersQuery(filters)
  const deleteUser = useDeleteUser()
  const openModal = useUIStore((s) => s.openModal)
  const [pendingDeleteUid, setPendingDeleteUid] = useState<string | null>(null)

  const handleDelete = async (uid: string) => {
    if (!confirm(t('admin.users.deleteConfirm'))) return
    setPendingDeleteUid(uid)
    try {
      await deleteUser.mutateAsync(uid)
    } finally {
      setPendingDeleteUid(null)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded-lg dark:bg-sop-surface" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-center text-sm text-red-500 py-8">
        {t('admin.users.loadError')}
      </p>
    )
  }

  const users = data?.users ?? []

  if (users.length === 0) {
    return (
      <p className="text-center text-sm dark:text-sop-muted py-8">
        {t('admin.users.noUsers')}
      </p>
    )
  }

  return (
    <div className="rounded-xl border dark:border-sop-border overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="dark:bg-sop-elevated border-b dark:border-sop-border">
            <th className="text-left px-4 py-3 font-semibold dark:text-sop-foreground">{t('admin.users.tableUser')}</th>
            <th className="text-left px-4 py-3 font-semibold dark:text-sop-foreground">{t('admin.users.tableRole')}</th>
            <th className="text-left px-4 py-3 font-semibold dark:text-sop-foreground">{t('admin.users.tableStatus')}</th>
            <th className="text-right px-4 py-3 font-semibold dark:text-sop-foreground">{t('admin.users.tableActions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.uid}
              className="border-b dark:border-sop-border dark:hover:bg-sop-hover transition-colors"
            >
              <td className="px-4 py-3">
                <div className="font-medium dark:text-sop-foreground">{user.displayName}</div>
                <div className="text-xs dark:text-sop-muted">{user.email}</div>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  user.role === 'super_admin'
                    ? 'bg-purple-100 text-purple-700 dark:bg-sop-elevated dark:text-sop-purple'
                    : 'bg-blue-100 text-blue-700 dark:bg-sop-surface dark:text-sop-cyan'
                }`}>
                  {user.role === 'super_admin' ? t('admin.users.superAdmin') : t('admin.users.admin')}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  user.isActive
                    ? 'bg-green-100 text-green-700 dark:bg-sop-surface dark:text-sop-green'
                    : 'bg-gray-100 text-gray-500 dark:bg-sop-bg dark:text-sop-subtle'
                }`}>
                  {user.isActive ? t('admin.users.active') : t('admin.users.inactive')}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(user)}
                      className="text-xs px-3 py-1.5 rounded-lg dark:bg-sop-surface
                        dark:text-sop-muted dark:hover:text-sop-foreground transition-colors"
                    >
                      {t('admin.users.editAction')}
                    </button>
                  )}
                  {user.uid !== currentUser?.uid && (
                    <button
                      onClick={() => handleDelete(user.uid)}
                      disabled={pendingDeleteUid === user.uid}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600
                        dark:bg-red-900/20 dark:text-red-400 hover:opacity-80 transition-opacity
                        disabled:opacity-50"
                    >
                      {pendingDeleteUid === user.uid ? t('admin.users.deleting') : t('admin.users.deleteAction')}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="px-4 py-3 border-t dark:border-sop-border flex items-center justify-between">
          <p className="text-xs dark:text-sop-muted">
            {t('admin.users.usersTotal', { count: data.total })}
          </p>
          <p className="text-xs dark:text-sop-muted">
            {t('admin.users.pageOf', { page: data.page, total: data.totalPages })}
          </p>
        </div>
      )}
    </div>
  )
}
