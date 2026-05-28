export const queryKeys = {
  content: {
    all: ['content'] as const,
    page: (page: string) => ['content', page] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (uid: string) => [...queryKeys.users.details(), uid] as const,
  },
  roles: {
    all: ['roles'] as const,
    list: () => [...queryKeys.roles.all, 'list'] as const,
    detail: (roleId: string) => [...queryKeys.roles.all, roleId] as const,
  },
  permissions: {
    all: ['permissions'] as const,
    list: () => [...queryKeys.permissions.all, 'list'] as const,
  },
  announcements: {
    all: ['announcements'] as const,
    list: (filters?: Record<string, unknown>) =>
      filters
        ? [...queryKeys.announcements.all, 'list', filters]
        : [...queryKeys.announcements.all, 'list'],
  },
  blog: {
    all: ['blog'] as const,
    meta: {
      all: () => [...queryKeys.blog.all, 'meta'] as const,
      list: (filters?: Record<string, unknown>) =>
        [...queryKeys.blog.meta.all(), 'list', filters ?? {}] as const,
      detail: (slug: string) =>
        [...queryKeys.blog.meta.all(), 'detail', slug] as const,
    },
    post: (slug: string) => [...queryKeys.blog.all, 'post', slug] as const,
  },
} as const
