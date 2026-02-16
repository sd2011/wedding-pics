import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'

const rubik = Rubik({ subsets: ['hebrew', 'latin'] })

export const metadata: Metadata = {
  title: 'אלבום תמונות החתונה שלנו',
  description: 'שתפו את הרגעים היפים ביותר מהחתונה שלנו',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={rubik.className}>{children}</body>
    </html>
  )
}