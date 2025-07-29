import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})
const nura = Inter({ 
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-nura'
})

export const metadata: Metadata = {
  title: 'Rizky Riyadi - Software Engineer',
  description: 'Portfolio of Rizky Riyadi, a passionate Software Engineer specializing in Node.js, TypeScript, and modern web technologies.',
  keywords: ['Software Engineer', 'Node.js', 'TypeScript', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Rizky Riyadi' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${jetbrainsMono.variable} ${nura.variable}`}>
      <body className={`${inter.className} ${jetbrainsMono.variable} ${nura.variable}`}>
        {children}
      </body>
    </html>
  )
}