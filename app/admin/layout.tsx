import type { Metadata } from 'next'
import AdminLayout from '@/components/admin/AdminLayout'
import { QueryProvider } from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'

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
