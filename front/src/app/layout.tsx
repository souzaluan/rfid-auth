import type { Metadata } from 'next'
import fonts from '../config/fonts'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ptBR">
      <body className={fonts.inter.className}>{children}</body>
    </html>
  )
}