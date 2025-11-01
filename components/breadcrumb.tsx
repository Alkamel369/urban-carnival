"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { language } = useLanguage()

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4">
      <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
        <span>{language === "ar" ? "الرئيسية" : "Home"}</span>
      </Link>

      {items.map((item, index) => (
        <Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
