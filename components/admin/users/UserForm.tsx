'use client'

import { useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { createUserSchema, updateUserSchema } from '@/schemas/user.schema'
import type { CreateUserInput, UpdateUserInput } from '@/schemas/user.schema'
import { useCreateUser } from '@/hooks/mutations/useCreateUser'
import { useUpdateUser } from '@/hooks/mutations/useUpdateUser'
import { useUIStore, useUnsavedChanges } from '@/stores/ui.store'
import type { AdminUser } from '@/lib/rbac/types'
import { ALL_PERMISSIONS, PERMISSION_GROUPS } from '@/lib/rbac/permissions'
import { useCurrentUser } from '@/stores/auth.store'

interface UserFormProps {
  mode: 'create' | 'edit'
  user?: AdminUser
  onSuccess?: () => void
}

export function UserForm({ mode, user, onSuccess }: UserFormProps) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const setUnsavedChanges = useUIStore((s) => s.setUnsavedChanges)
  const hasUnsavedChanges = useUnsavedChanges('user-form')

  const schema = mode === 'create' ? createUserSchema : updateUserSchema
  const createUser = useCreateUser()
  const updateUser = useUpdateUser(user?.uid ?? '')

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<CreateUserInput | UpdateUserInput>({
    resolver: zodResolver(schema) as Resolver<CreateUserInput | UpdateUserInput>,
    defaultValues: user
      ? {
          email: user.email,
          displayName: user.displayName,
          role: user.role,
          isActive: user.isActive,
          customPermissions: user.customPermissions ?? [],
          password: '',
        }
      : {
          isActive: true,
          customPermissions: [],
        },
  })

  useEffect(() => {
    setUnsavedChanges('user-form', isDirty)
  }, [isDirty, setUnsavedChanges])

  const onSubmit = async (data: CreateUserInput | UpdateUserInput) => {
    if (mode === 'create') {
      await createUser.mutateAsync(data as CreateUserInput)
    } else {
      await updateUser.mutateAsync(data as UpdateUserInput)
    }
    reset()
    onSuccess?.()
  }

  const isPending = createUser.isPending || updateUser.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium mb-1.5 dark:text-sop-foreground">
          {t('admin.users.displayName')}
        </label>
        <input
          id="displayName"
          {...register('displayName')}
          placeholder="John Doe"
          className="w-full rounded-lg border px-3 py-2 text-sm
            dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground
            dark:placeholder:text-sop-subtle dark:caret-sop-foreground"
        />
        {errors.displayName && (
          <p className="mt-1 text-xs text-red-500">{errors.displayName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5 dark:text-sop-foreground">
          {t('admin.users.email')}
        </label>
        <input
          id="email"
          {...register('email')}
          type="email"
          placeholder="john@worth.agency"
          className="w-full rounded-lg border px-3 py-2 text-sm
            dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground
            dark:placeholder:text-sop-subtle dark:caret-sop-foreground"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1.5 dark:text-sop-foreground">
          {mode === 'edit' ? t('admin.users.passwordEdit') : t('admin.users.password')}
        </label>
        <input
          id="password"
          {...register('password')}
          type="password"
          placeholder="SecurePass123"
          className="w-full rounded-lg border px-3 py-2 text-sm
            dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground
            dark:placeholder:text-sop-subtle dark:caret-sop-foreground"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-1.5 dark:text-sop-foreground">
          {t('admin.users.role')}
        </label>
        <select
          id="role"
          {...register('role')}
          disabled={mode === 'edit' && user?.role === 'super_admin'}
          className="w-full rounded-lg border px-3 py-2 text-sm
            dark:bg-sop-bg dark:border-sop-border dark:text-sop-foreground"
        >
          <option value="">{t('admin.users.selectRole')}</option>
          {currentUser?.role === 'super_admin' && (
            <option value="super_admin">{t('admin.users.superAdmin')}</option>
          )}
          <option value="admin">{t('admin.users.admin')}</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="isActive" className="text-sm font-medium dark:text-sop-foreground">
          {t('admin.users.activeLabel')}
        </label>
        <input id="isActive" type="checkbox" {...register('isActive')} />
      </div>

      {currentUser?.role === 'super_admin' && (
        <div>
          <label className="block text-sm font-medium mb-3 dark:text-sop-foreground">
            {t('admin.users.customPermissions')}
          </label>
          {PERMISSION_GROUPS.map((group) => (
            <div key={group} className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-sop-subtle mb-2">
                {group}
              </p>
              <div className="space-y-2">
                {Object.entries(ALL_PERMISSIONS)
                  .filter(([, p]) => p.group === group)
                  .map(([key, perm]) => (
                    <label key={key} className="flex items-center gap-2 text-sm dark:text-sop-foreground">
                      <input
                        type="checkbox"
                        value={key}
                        {...register('customPermissions')}
                      />
                      {perm.label}
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || isSubmitting}
        className="w-full bg-primary text-white rounded-lg py-2.5 text-sm
          font-semibold disabled:opacity-50 disabled:cursor-not-allowed
          dark:shadow-sop-orange"
      >
        {isPending
          ? mode === 'create' ? t('admin.users.creating') : t('admin.users.saving')
          : mode === 'create' ? t('admin.users.createUserBtn') : t('admin.users.saveChanges')}
      </button>

      {hasUnsavedChanges && (
        <p className="text-xs text-center text-amber-500">
          {t('admin.users.unsavedChanges')}
        </p>
      )}
    </form>
  )
}
