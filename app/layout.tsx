import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import RootContent from '@/components/root-content'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Kashyflo - Smart Budget Splitting for Nigerian Earners',
  description: 'Offline-first budgeting app for salary earners. Track expenses, split income smartly, and never worry about running out of money.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/kashyflo-logo.png',
    apple: '/kashyflo-logo.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <RootContent>{children}</RootContent>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
