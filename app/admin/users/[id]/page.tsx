'use client'

import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import { useUserQuery } from '@/hooks/queries/useUsersQuery'
import { UserForm } from '@/components/admin/users/UserForm'

export default function UserDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: user, isLoading, isError } = useUserQuery(id)

  if (isLoading) {
    return (
      <div>
        <AdminHeader title={t('admin.users.editUser')} />
        <div className="p-6 max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded dark:bg-sop-surface" />
            <div className="h-64 rounded-xl dark:bg-sop-surface" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div>
        <AdminHeader title={t('admin.users.editUser')} />
        <div className="p-6 max-w-2xl mx-auto text-center">
          <p className="dark:text-sop-muted">{t('admin.users.userNotFound')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader title={t('admin.users.editUser')} subtitle={user.email} />

      <div className="p-6 max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-sm dark:text-sop-muted dark:hover:text-sop-foreground transition-colors mb-6 flex items-center gap-1"
        >
          {t('admin.users.back')}
        </button>

        <div className="rounded-xl p-6 dark:bg-sop-surface dark:border dark:border-sop-border">
          <UserForm
            mode="edit"
            user={user}
            onSuccess={() => router.push('/admin/users')}
          />
        </div>
      </div>
    </div>
  )
}
