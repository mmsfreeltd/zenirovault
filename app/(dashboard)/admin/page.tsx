import UserTableServer from "@/components/admin/users/user-table-server";
import { CardComponent } from "@/components/common/section-card";

export default function Page() {
  return (
    <>
      <div className="sm:flex">
        <div className="sm:w-1/2 my-4 sm:my-0 ">
          <CardComponent coinId="btc-bitcoin" />
        </div>
        <div className="sm:w-1/2">
          <CardComponent coinId="eth-ethereum" />
        </div>
      </div>

      <UserTableServer />
    </>
  );
}
