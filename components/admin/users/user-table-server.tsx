import { UserTable } from "@/components/admin/users/user-table";
import { fetchClients } from "@/server/actions/clients";

export default async function UserTableServer() {
  const users = await fetchClients();

  return <UserTable data={users} />;
}
