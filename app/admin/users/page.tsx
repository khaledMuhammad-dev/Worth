'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import { UserTable } from '@/components/admin/users/UserTable'
import { UserFilters } from '@/components/admin/users/UserFilters'
import { UserForm } from '@/components/admin/users/UserForm'
import type { AdminUser } from '@/lib/rbac/types'

export default function UsersPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState<{
    search?: string
    role?: string
    isActive?: boolean
  }>({})
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)

  return (
    <div>
      <AdminHeader
        title={t('admin.users.title')}
        subtitle={t('admin.users.subtitle')}
      />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={() => {
              setEditingUser(null)
              setShowCreateForm(true)
            }}
            className="bg-primary text-white rounded-lg px-4 py-2 text-sm font-semibold"
          >
            + {t('admin.users.addUser')}
          </button>
        </div>

        <UserFilters onFiltersChange={setFilters} />

        <UserTable
          filters={filters}
          onEdit={(user) => {
            setEditingUser(user)
            setShowCreateForm(true)
          }}
        />

        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="rounded-xl p-6 w-full max-w-lg dark:bg-sop-surface shadow-sop-card overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold dark:text-sop-foreground">
                  {editingUser ? t('admin.users.editUser') : t('admin.users.addNewUser')}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateForm(false)
                    setEditingUser(null)
                  }}
                  className="dark:text-sop-muted dark:hover:text-sop-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              <UserForm
                mode={editingUser ? 'edit' : 'create'}
                user={editingUser ?? undefined}
                onSuccess={() => {
                  setShowCreateForm(false)
                  setEditingUser(null)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
