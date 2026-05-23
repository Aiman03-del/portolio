import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import { AppToastContainer } from '@/components/ui/app-toast-container'
import { NavigationLoader } from '@/components/navigation-loader'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Aiman Uddin Siam | Full Stack Developer',
  description: 'Premium full-stack developer crafting cinematic digital experiences with meticulous attention to detail and cutting-edge technology.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Aiman Uddin Siam | Full Stack Developer',
    description: 'Premium portfolio showcasing cinematic web design and full-stack development expertise.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <NavigationLoader />
        {children}
        <AppToastContainer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
