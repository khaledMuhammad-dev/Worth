import type { PermissionKey } from './permissions'
import { ALL_PERMISSIONS } from './permissions'

export const DEFAULT_ROLE_PERMISSIONS: Record<string, PermissionKey[]> = {
  super_admin: Object.keys(ALL_PERMISSIONS) as PermissionKey[],
  admin: [
    'content:home:view',        'content:home:edit',
    'content:about:view',       'content:about:edit',
    'content:services:view',    'content:services:edit',
    'content:pricing:view',     'content:pricing:edit',
    'content:work:view',        'content:work:edit',
    'content:contact:view',     'content:contact:edit',
    'content:navigation:view',  'content:navigation:edit',
    'announcements:all:view',   'announcements:all:create',
    'announcements:all:edit',   'announcements:all:delete',
    'blog:all:view',            'blog:all:create',
    'blog:all:edit',            'blog:all:publish',
    'users:all:view',
    'roles:all:view',
  ],
}
