// import UserQuickActions from "@/components/admin/users/UserQuickActions";
import UserDetailTabs from "@/components/user/account/UserDetailTabs";
import UserProfileHeader from "@/components/user/account/UserProfileHeader";
export const revalidate = 0;
export default async function UserPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <UserProfileHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <UserDetailTabs />
          </div>
          {/* <div className="lg:col-span-1">
            <UserQuickActions />
          </div> */}
        </div>
      </div>
    </div>
  );
}
