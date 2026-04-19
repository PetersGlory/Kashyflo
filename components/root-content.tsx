'use client'

import { useServiceWorker } from '@/hooks/use-service-worker'
import { ReactNode } from 'react'

export default function RootContent({ children }: { children: ReactNode }) {
  useServiceWorker()

  return <>{children}</>
}
