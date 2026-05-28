import { z } from 'zod'

export const announcementSchema = z.object({
  messageEN: z.string().min(1, 'English message is required').max(200),
  messageAR: z.string().min(1, 'Arabic message is required').max(200),
  ctaLabelEN: z.string().max(50).optional(),
  ctaLabelAR: z.string().max(50).optional(),
  ctaHref: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  bgColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  emoji: z.string().max(4).optional(),
  priority: z.number().int().min(1).max(100),
  startDate: z.string().min(1, 'Start date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  active: z.boolean().default(true),
  dismissible: z.boolean().default(true),
}).refine(
  (d) => new Date(d.startDate) < new Date(d.expiryDate),
  { message: 'Expiry date must be after start date', path: ['expiryDate'] }
)

export type AnnouncementInput = z.infer<typeof announcementSchema>
