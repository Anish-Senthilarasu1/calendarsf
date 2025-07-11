import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "SF Tech Calendar",
  description: "Premium calendar for SF tech and startup events",
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'SF Tech Calendar',
    description: 'Premium calendar for SF tech and startup events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SF Tech Calendar',
    description: 'Premium calendar for SF tech and startup events',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="preload" as="style" onLoad="this.onload=null;this.rel='stylesheet'" />
        <noscript><link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="stylesheet" /></noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            [data-v0-t] {
              display: none !important;
            }
            .v0-watermark {
              display: none !important;
            }
            [class*="watermark"] {
              display: none !important;
            }
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
