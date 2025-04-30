import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LAMS',
  description: 'Created by Arsh',
  generator: 'Arsh',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
