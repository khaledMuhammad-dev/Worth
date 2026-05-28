export type Role = 'super_admin' | 'admin'

export type Resource =
  | 'content'
  | 'announcements'
  | 'blog'
  | 'users'
  | 'roles'
  | 'settings'

export type Action = 'view' | 'create' | 'edit' | 'delete' | 'publish'

export type Permission = `${Resource}:${string}:${Action}`

export interface AdminUser {
  uid: string
  email: string
  displayName: string
  photoURL: string
  role: Role
  customPermissions: Permission[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLoginAt: string
}
