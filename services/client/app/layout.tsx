import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import { ReduxProvider } from '@/store/provider'
import './globals.css'

const inter = Kanit({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'] 
})

export const metadata: Metadata = {
  title: 'EP LINK',
  description: 'ep creations',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
