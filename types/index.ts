import {
  account_status,
  admin_banks,
  admin_wallets,
  clients,
  experts,
  loans,
  outstanding_fees,
  plans,
  settings,
  simulation_trades,
  simulations,
  ticket_replies,
  tickets,
  transactions,
  transfer_codes,
  user_documents,
} from "@/db/schema";

export type FrontendResponseType = {
  message: string;
  success: boolean;
  id?: string;
};

export type BaseAccountStatusType = typeof account_status.$inferSelect;
export type AccountStatusType = BaseAccountStatusType & {};

export type BaseClients = typeof clients.$inferSelect;
export type ClientType = BaseClients & {
  status_text: string;
};

export type BaseTransactionType = typeof transactions.$inferSelect;
export type TransactionType = BaseTransactionType & {
  user_email: string;
  user_currency: string;
};

export type BaseExpertType = typeof experts.$inferSelect;
export type ExpertType = BaseExpertType & {};

export type BaseAdminWalletType = typeof admin_wallets.$inferSelect;
export type AdminWalletType = BaseAdminWalletType & {
  coin_symbol: string;
};

export type BaseAdminBankType = typeof admin_banks.$inferSelect;
export type AdminBankType = BaseAdminBankType & {};

export type BasePlanType = typeof plans.$inferSelect;

export type LoanType = typeof loans.$inferSelect;

export type PlanType = BasePlanType & {};

export type OutstandingBillType = typeof outstanding_fees.$inferSelect;
export type OutstandingBillDisplay = OutstandingBillType & {
  client_email: string | null;
};

export type WithdrawBillType = typeof transfer_codes.$inferSelect;
export type WithdrawBillDisplayType = WithdrawBillType & {
  client_email: string | null;
};

export type SettingsTypes = typeof settings.$inferSelect;

export type Tickets = typeof tickets.$inferSelect;
export type TicketReplies = typeof ticket_replies.$inferSelect;

// Mock ticket data
export type TicketWithReplies = Tickets & {
  replies: TicketReplies[];
};

export interface CodePayload {
  id: number;
  code_name: string;
  code_message: string;
}

export type WithdrawalResponse =
  | { success: true; message: string }
  | { success: false; message: string; needCode: true; code: CodePayload };

export type AuthAccount = {
  email: string;
  name: string;
  id: string;
};

export type UserDocument = typeof user_documents.$inferSelect;

export type Simulation = typeof simulations.$inferSelect;
export type SimulationTrade = typeof simulation_trades.$inferSelect;
