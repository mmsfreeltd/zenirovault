// app/admin/profile/page.tsx
import { NextResponse } from "next/server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SecurityForm } from "@/components/admin/profile/SecurityForm";
import { PlatformSettingsForm } from "@/components/admin/profile/PlatformSettingsForm";
import { db } from "@/db";
import { requireSession } from "@/server/lib/secure";
import { settings } from "@/db/schema";

export const revalidate = 0;

export default async function ProfilePage() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const adm = await db.query.admin.findFirst();
  let sett = await db.query.settings.findFirst();
  if (!sett) {
    const [inserted] = await db
      .insert(settings)
      .values({
        auto_trade: 0,
        site_phone: "",
        signup_bonus: 0,
        allow_signup_bonus: 0,
        site_location: "",
        other: "",
        allow_ref_bonus: 0,
        ref_bonus_percentage: 0,
        currency: "",
        facebook: null,
        twitter: null,
        instagram: null,
        telegram: null,
        needVerification: "1",
        verificationType: "1",
        allowRegistration: "1",
      })
      .returning();
    sett = inserted;
  }

  if (!sett) {
    throw new Error("Failed to load profile data ");
  }

  if (!adm) {
    throw new Error("Failed to load profile data ");
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Profile</h1>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="platform">Platform Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="security">
          <SecurityForm />
        </TabsContent>

        <TabsContent value="platform">
          <PlatformSettingsForm settings={sett} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
