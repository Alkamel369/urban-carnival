"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Globe, Bell, User, Shield, Save } from "lucide-react"

export default function SettingsPage() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleSave = () => {
    if (updateUser) {
      updateUser({ name, email })
    }
    alert(language === "ar" ? "تم حفظ الإعدادات بنجاح" : "Settings saved successfully")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t.settings?.title || "Settings"}</h1>
          <p className="text-muted-foreground text-lg">{t.settings?.subtitle || "Manage your account preferences"}</p>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>{t.settings?.account || "Account Settings"}</CardTitle>
              </div>
              <CardDescription>{t.settings?.accountDescription || "Update your personal information"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.settings?.name || "Name"}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.settings?.email || "Email"}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                {t.settings?.saveChanges || "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <CardTitle>{t.settings?.language || "Language"}</CardTitle>
              </div>
              <CardDescription>{t.settings?.languageDescription || "Choose your preferred language"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  onClick={() => setLanguage("en")}
                  className="flex-1"
                >
                  English
                </Button>
                <Button
                  variant={language === "ar" ? "default" : "outline"}
                  onClick={() => setLanguage("ar")}
                  className="flex-1"
                >
                  العربية
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>{t.settings?.notifications || "Notifications"}</CardTitle>
              </div>
              <CardDescription>
                {t.settings?.notificationsDescription || "Manage your notification preferences"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.settings?.pushNotifications || "Push Notifications"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t.settings?.pushNotificationsDescription || "Receive notifications about your courses"}
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.settings?.emailNotifications || "Email Updates"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t.settings?.emailNotificationsDescription || "Receive email updates about new courses"}
                  </p>
                </div>
                <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>{t.settings?.learningPreferences || "Learning Preferences"}</CardTitle>
              </div>
              <CardDescription>
                {t.settings?.learningPreferencesDescription || "Customize your learning experience"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.settings?.autoplayVideos || "Autoplay Videos"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t.settings?.autoplayVideosDescription || "Automatically play next video in sequence"}
                  </p>
                </div>
                <Switch checked={autoplay} onCheckedChange={setAutoplay} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
