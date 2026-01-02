// app/api/user/trade/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  deposit,
  trades,
  notifications,
  transactions,
  clients,
  cryptos,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import {
  randomOutcome,
  randomWalk,
  monteCarlo,
  userScenario,
  stairStepMomentum,
  thresholdBounce,
} from "@/lib/simulations";
import { sendTransactionEmail } from "@/server/lib/email";

export async function POST(req: Request) {
  // 1️⃣ require a logged-in user
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  const { deposit_id, stake, strategy, scenario_pct } = await req.json();
  const userId = Number(auth.session?.auth_account.id ?? 0);

  if (
    !deposit_id ||
    Number.isNaN(stake) ||
    !["rand", "walk", "mc", "scenario", "stairMoment", "threshold"].includes(
      strategy
    )
  ) {
    return NextResponse.json(
      { success: false, message: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  // 2️⃣ load deposit (and ensure it belongs to this user)
  const dep = await db.query.deposit.findFirst({
    where: eq(deposit.id, deposit_id),
    columns: { amount: true, coin_id: true, user_id: true },
  });
  if (!dep || dep.user_id !== userId) {
    return NextResponse.json(
      { success: false, message: "Deposit not found" },
      { status: 404 }
    );
  }

  const oldBal = dep.amount ?? 0;
  let exit: number, pnl: number;

  // 3️⃣ run the chosen simulation on the **stake** amount
  switch (strategy) {
    case "rand":
      ({ exit, pnl } = randomOutcome(stake));
      break;
    case "walk":
      ({ exit, pnl } = randomWalk(stake));
      break;
    case "mc":
      ({ exit, pnl } = monteCarlo(stake));
      break;
    case "scenario":
      ({ exit, pnl } = userScenario(stake, (scenario_pct ?? 0) / 100));
      break;
    case "threshold":
      ({ exit, pnl } = thresholdBounce(stake));
      break;
    case "stairMoment":
      ({ exit, pnl } = stairStepMomentum(stake));
      break;
    default:
      throw new Error(`Unknown strategy: ${strategy}`);
  }

  // ({ exit, pnl } = userScenario(stake, (scenario_pct ?? 0) / 100));
  // 4️⃣ update deposit balance
  const newBal = oldBal + pnl;
  await db
    .update(deposit)
    .set({ amount: Number(newBal.toFixed(2)) })
    .where(eq(deposit.id, deposit_id));

  // 5️⃣ record the trade
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 8);
  const status = pnl >= 0 ? "Profit" : "Loss";
  const ref = `LIVE|${date.replace(/-/g, "")}|${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  await db.insert(trades).values({
    trade_type: "Buy",
    asset: dep.coin_id,
    trade_pair: strategy,
    date,
    time,
    payout: pnl.toString(),
    stake_price: stake.toString(),
    trade_price: exit.toString(),
    status,
    user_id: userId,
    deposit_id,
    is_trading: 0,
    isLive: 1,
  });

  // 6️⃣ send a notification
  const user = await db.query.clients.findFirst({
    where: eq(clients.id, userId),
    columns: { email: true, currency: true, f_name: true, l_name: true },
  });
  const neat = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: user?.currency ?? "USD",
    maximumFractionDigits: 2,
  }).format(pnl);

  const subj = `${user?.currency ?? "USD"} ${neat} Trade ${status}`;
  await db.insert(notifications).values({
    user_id: userId,
    status: 0,
    date,
    subject: subj,
    message: `Your ${status.toLowerCase()} of ${
      user?.currency ?? "USD"
    } ${neat} has been applied to your balance.`,
  });

  // 7️⃣ record a transaction
  await db.insert(transactions).values({
    date: date,
    type: "Trade",
    method: strategy,
    amount: Math.abs(Number(pnl.toFixed(3))).toString(),
    status: "Successful",
    wallet: String(dep.coin_id),
    deposit_id,
    user_id: userId,
    ref,
    description: subj,
  });

  // 8️⃣ fire off a confirmation email
  const coin = await db.query.cryptos.findFirst({
    where: eq(cryptos.id, Number(dep.coin_id)),
    columns: { coin_symbol: true, coin_logo: true },
  });
  if (user) {
    sendTransactionEmail(
      String(user.email),
      subj,
      {
        f_name: user.f_name as string,
        l_name: user.l_name as string,
        email: user.email as string,
        currency: user.currency as string,
      },
      {
        amount: neat,
        coin_amount: pnl,
        coin_name: String(coin?.coin_symbol ?? dep.coin_id),
        coin_logo: coin?.coin_logo ?? "",
        date: now,
        ref,
      }
    );
  }

  return NextResponse.json({ success: true, message: "Trade executed" });
}
