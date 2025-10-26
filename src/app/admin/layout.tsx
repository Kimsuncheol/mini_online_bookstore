import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | BookNest',
  description: 'Manage your BookNest platform',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
