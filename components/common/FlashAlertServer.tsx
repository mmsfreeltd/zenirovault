import { getFlash } from "@/server/lib/auth";
import { FlashAlertClient } from "@/components/common/FlashAlertClient";

export async function FlashAlert() {
  const flash = await getFlash();
  if (!flash) return null;

  return <FlashAlertClient flash={flash} />;
}
