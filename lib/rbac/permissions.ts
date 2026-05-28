export const ALL_PERMISSIONS = {
  'content:home:view':          { label: 'View Home content',       group: 'Content' },
  'content:home:edit':          { label: 'Edit Home content',       group: 'Content' },
  'content:about:view':         { label: 'View About content',      group: 'Content' },
  'content:about:edit':         { label: 'Edit About content',      group: 'Content' },
  'content:services:view':      { label: 'View Services content',   group: 'Content' },
  'content:services:edit':      { label: 'Edit Services content',   group: 'Content' },
  'content:pricing:view':       { label: 'View Pricing content',    group: 'Content' },
  'content:pricing:edit':       { label: 'Edit Pricing content',    group: 'Content' },
  'content:work:view':          { label: 'View Work content',       group: 'Content' },
  'content:work:edit':          { label: 'Edit Work content',       group: 'Content' },
  'content:contact:view':       { label: 'View Contact content',    group: 'Content' },
  'content:contact:edit':       { label: 'Edit Contact content',    group: 'Content' },
  'content:navigation:view':    { label: 'View Navigation',         group: 'Content' },
  'content:navigation:edit':    { label: 'Edit Navigation',         group: 'Content' },
  'announcements:all:view':     { label: 'View Announcements',      group: 'Announcements' },
  'announcements:all:create':   { label: 'Create Announcements',    group: 'Announcements' },
  'announcements:all:edit':     { label: 'Edit Announcements',      group: 'Announcements' },
  'announcements:all:delete':   { label: 'Delete Announcements',    group: 'Announcements' },
  'blog:all:view':              { label: 'View Blog posts',         group: 'Blog' },
  'blog:all:create':            { label: 'Create Blog posts',       group: 'Blog' },
  'blog:all:edit':              { label: 'Edit Blog posts',         group: 'Blog' },
  'blog:all:delete':            { label: 'Delete Blog posts',       group: 'Blog' },
  'blog:all:publish':           { label: 'Publish Blog posts',      group: 'Blog' },
  'users:all:view':             { label: 'View Users',              group: 'Users' },
  'users:all:create':           { label: 'Create Users',            group: 'Users' },
  'users:all:edit':             { label: 'Edit Users',              group: 'Users' },
  'users:all:delete':           { label: 'Delete Users',            group: 'Users' },
  'roles:all:view':             { label: 'View Roles',              group: 'Roles' },
  'roles:all:edit':             { label: 'Edit Role permissions',   group: 'Roles' },
  'settings:all:view':          { label: 'View Settings',           group: 'Settings' },
  'settings:all:edit':          { label: 'Edit Settings',           group: 'Settings' },
} as const satisfies Record<string, { label: string; group: string }>

export type PermissionKey = keyof typeof ALL_PERMISSIONS

export const PERMISSION_GROUPS = [
  ...new Set(Object.values(ALL_PERMISSIONS).map((p) => p.group)),
]
