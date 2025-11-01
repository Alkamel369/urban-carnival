import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { ProgressProvider } from "@/contexts/progress-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduPlatform - Learn Without Limits",
  description: "Master new skills with our innovative bilingual learning platform",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <ProgressProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </ProgressProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
