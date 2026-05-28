'use client'

import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import { RolePermissionsMatrix } from '@/components/admin/roles/RolePermissionsMatrix'

export default function RolesPage() {
  const { t } = useTranslation()

  return (
    <div>
      <AdminHeader
        title={t('admin.roles.title')}
        subtitle={t('admin.roles.subtitle')}
      />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="rounded-xl p-6 dark:bg-sop-surface dark:border dark:border-sop-border">
          <RolePermissionsMatrix />
        </div>
      </div>
    </div>
  )
}
