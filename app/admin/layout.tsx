import type { Metadata } from 'next'
import AdminLayout from '@/components/admin/AdminLayout'
import { QueryProvider } from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'

// Admin pages are auth-gated and personalised — never prerender them
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Worth CMS',
  robots: 'noindex',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AdminLayout>{children}</AdminLayout>
      </AuthProvider>
    </QueryProvider>
  )
}
