import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsNotifications } from "@/components/settings/settings-notifications"
import { SettingsCalendars } from "@/components/settings/settings-calendars"
import { SettingsAccount } from "@/components/settings/settings-account"
import { SettingsBranding } from "@/components/settings/settings-branding"
import { SettingsTeam } from "@/components/settings/settings-team"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-3xl font-bold">Settings</h1>

          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-5 bg-[#1A1A1A] p-1">
              <TabsTrigger value="notifications" className="data-[state=active]:bg-[#7747FF]">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="calendars" className="data-[state=active]:bg-[#7747FF]">
                Calendars
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-[#7747FF]">
                Account
              </TabsTrigger>
              <TabsTrigger value="branding" className="data-[state=active]:bg-[#7747FF]">
                Branding
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-[#7747FF]">
                Team
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications">
              <SettingsNotifications />
            </TabsContent>

            <TabsContent value="calendars">
              <SettingsCalendars />
            </TabsContent>

            <TabsContent value="account">
              <SettingsAccount />
            </TabsContent>

            <TabsContent value="branding">
              <SettingsBranding />
            </TabsContent>

            <TabsContent value="team">
              <SettingsTeam />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
