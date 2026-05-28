import { z } from 'zod'

export const updateRolePermissionsSchema = z.object({
  roleId: z.enum(['super_admin', 'admin']),
  permissions: z.array(z.string()),
  description: z.string().max(200).optional(),
})

export type UpdateRolePermissionsInput = z.infer<typeof updateRolePermissionsSchema>
