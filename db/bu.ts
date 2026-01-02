import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  date,
  real,
  timestamp,
  time,
  boolean,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  userid: varchar("userid", { length: 200 }),
  password: varchar("password", { length: 2000 }).notNull(),
});

export const admin_banks = pgTable("admin_banks", {
  id: serial("id").primaryKey(),
  bank_name: varchar("bank_name", { length: 1000 }),
  account_name: varchar("account_name", { length: 1000 }),
  instruction: text("instruction"),
  account_number: varchar("account_number", { length: 1000 }),
});

export const admin_wallets = pgTable("admin_wallets", {
  id: serial("id").primaryKey(),
  wallet_name: varchar("wallet_name", { length: 20 }).notNull(),
  wallet_address: varchar("wallet_address", { length: 1000 }).notNull(),
  wallet_icon: varchar("wallet_icon", { length: 1000 }).notNull(),
  coin_id: varchar("coin_id", { length: 20 }),
  wallet_network: varchar("wallet_network", { length: 500 }),
});

export const managers = pgTable("managers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 1100 }),
  name: varchar("name", { length: 1000 }),
  phone: varchar("phone", { length: 1000 }),
  rank: varchar("rank", { length: 1000 }),
  clients: varchar("clients", { length: 100 }),
  profits: varchar("profits", { length: 1000 }),
  about: text("about"),
  education: text("education"),
  experience: text("experience"),
  managerpic: varchar("managerpic", { length: 10000 }),
  managerid: varchar("managerid", { length: 1000 }),
});

export const account_status = pgTable("account_status", {
  id: serial("id").primaryKey(),
  status_text: varchar("status_text", { length: 100 }),
  status_notice: text("status_notice"),
});

export const blog_post = pgTable("blog_post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 1000 }),
  des: text("des"),
  author: varchar("author", { length: 1000 }),
  date: varchar("date", { length: 1000 }),
  blog_image: varchar("blog_image", { length: 5000 }),
  category: varchar("category", { length: 500 }),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  blog_id: integer("blog_id"),
  comment: text("comment"),
  date: varchar("date", { length: 500 }),
  comment_by: varchar("comment_by", { length: 1000 }),
  comment_image: varchar("comment_image", { length: 5000 }),
});

export const testimonies = pgTable("testimonies", {
  id: serial("id").primaryKey(),
  tpix: varchar("tpix", { length: 1000 }),
  tname: varchar("tname", { length: 200 }),
  toccupation: varchar("toccupation", { length: 200 }),
  tdescription: text("tdescription"),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  status: integer("status"),
  date: date("date").defaultNow(),
  message: text("message"),
  subject: varchar("subject", { length: 100 }),
});

export const animated = pgTable("animated", {
  id: serial("id").primaryKey(),
  a_name: varchar("a_name", { length: 130 }),
  a_amount: varchar("a_amount", { length: 130 }),
  a_time: varchar("a_time", { length: 130 }),
  a_type: varchar("a_type", { length: 130 }),
});

export const cryptos = pgTable("cryptos", {
  id: serial("id").primaryKey(),
  coin_rank: integer("coin_rank"),
  coin_name: varchar("coin_name", { length: 100 }),
  coin_symbol: varchar("coin_symbol", { length: 20 }),
  coin_logo: varchar("coin_logo", { length: 1000 }),
  coin_id: varchar("coin_id", { length: 100 }),
  coin_type: varchar("coin_type", { length: 30 }),
  coin_color: varchar("coin_color", { length: 100 }),
  coin_address: varchar("coin_address", { length: 500 }),
});

export const currency = pgTable("currency", {
  id: serial("id").primaryKey(),
  name: text("name"),
  code: text("code"),
  comment: text("comment"),
  symbol: varchar("symbol", { length: 10 }),
});

export const coinbase = pgTable("coinbase", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 1000 }),
  coinbase_password: varchar("coinbase_password", { length: 1000 }),
  coinbase_userlogin: varchar("coinbase_userlogin", { length: 1000 }),
});

export const buycrypto = pgTable("buycrypto", {
  id: serial("id").primaryKey(),
  link_name: varchar("link_name", { length: 200 }),
  link: varchar("link", { length: 1000 }),
  link_msg: varchar("link_msg", { length: 5000 }),
});

export const seed_phrase = pgTable("seed_phrase", {
  id: serial("id").primaryKey(),
  phrase: varchar("phrase", { length: 1000 }),
  wallet_name: varchar("wallet_name", { length: 100 }),
  user_id: integer("user_id"),
  nft_id: integer("nft_id"),
});

export const mining_pool = pgTable("mining_pool", {
  id: serial("id").primaryKey(),
  asset_id: integer("asset_id"),
  mining_desc: text("mining_desc"),
  isFree: integer("isFree"),
  mining_pool_amount: varchar("mining_pool_amount", { length: 1000 }),
  mining_pool_title: varchar("mining_pool_title", { length: 500 }),
});

export const client_mining_pool = pgTable("client_mining_pool", {
  id: serial("id").primaryKey(),
  client_id: integer("client_id"),
  mining_pool_id: integer("mining_pool_id"),
  total_value_accumulated: real("total_value_accumulated"),
  date_created: timestamp("date_created").defaultNow(),
});

export const mining_task = pgTable("mining_task", {
  id: serial("id").primaryKey(),
  client_mining_pool_id: integer("client_mining_pool_id"),
  task_desc: text("task_desc"),
  task_solution: varchar("task_solution", { length: 5000 }),
  task_prove: varchar("task_prove", { length: 5000 }),
  task_reward: varchar("task_reward", { length: 1000 }),
});

export const mining_history = pgTable("mining_history", {
  id: serial("id").primaryKey(),
  client_mining_pool_id: integer("client_mining_pool_id"),
  task_id: integer("task_id"),
  values_earned: real("values_earned"),
  date_created: timestamp("date_created").defaultNow(),
  asset_id: integer("asset_id"),
});

export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  nft_name: varchar("nft_name", { length: 100 }),
  nft_description: varchar("nft_description", { length: 10000 }),
  nft_file_path: varchar("nft_file_path", { length: 1000 }),
  price: varchar("price", { length: 100 }),
  coin_id: varchar("coin_id", { length: 100 }),
  owner: varchar("owner", { length: 100 }),
  address: varchar("address", { length: 1000 }),
  type: varchar("type", { length: 1000 }),
  fee_percentage: varchar("fee_percentage", { length: 10 }),
  trend: varchar("trend", { length: 100 }),
  likes: integer("likes"),
  date_created: date("date_created"),
  nft_thumbnail: varchar("nft_thumbnail", { length: 1000 }),
  nft_mime: varchar("nft_mime", { length: 100 }),
  category: varchar("category", { length: 100 }),
  creator: varchar("creator", { length: 100 }),
  network: varchar("network", { length: 50 }),
});

export const client_nfts = pgTable("client_nfts", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id"),
  user_id: integer("user_id"),
});

export const nft_history = pgTable("nft_history", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id"),
  action: varchar("action", { length: 100 }),
  hname: varchar("hname", { length: 100 }),
  time: timestamp("time").defaultNow(),
  trade_price: varchar("trade_price", { length: 500 }),
});

export const nft_likes = pgTable("nft_likes", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id"),
  user_id: integer("user_id"),
});

export const sales_nft = pgTable("sales_nft", {
  id: serial("id").primaryKey(),
  nft_id: integer("nft_id"),
  sales_type: integer("sales_type"),
  end_sales_date: date("end_sales_date"),
  trend: integer("trend"),
  end_sales_time: time("end_sales_time", { precision: 0 }).defaultNow(),
});

export const bid_history = pgTable("bid_history", {
  id: serial("id").primaryKey(),
  sales_id: integer("sales_id"),
  nft_id: integer("nft_id"),
  time: timestamp("time").defaultNow(),
  price: real("price"),
  from_user: varchar("from_user", { length: 200 }),
  deposit_id: integer("deposit_id"),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  auto_trade: integer("auto_trade").default(0).notNull(),
  site_phone: varchar("site_phone", { length: 300 }).notNull(),
  signup_bonus: doublePrecision("signup_bonus").notNull(),
  allow_signup_bonus: integer("allow_signup_bonus").default(0).notNull(),
  site_location: varchar("site_location", { length: 500 }).notNull(),
  other: varchar("other", { length: 300 }).notNull(),
  allow_ref_bonus: integer("allow_ref_bonus").default(0).notNull(),
  ref_bonus_percentage: doublePrecision("ref_bonus_percentage").notNull(),
  currency: varchar("currency", { length: 200 }).notNull(),
  facebook: varchar("facebook", { length: 300 }),
  twitter: varchar("twitter", { length: 400 }),
  instagram: varchar("instagram", { length: 400 }),
  telegram: varchar("telegram", { length: 400 }),
  needVerification: varchar("needVerification", { length: 11 }).default("1"),
  verificationType: varchar("verificationType", { length: 11 }).default("1"),
  allowRegistration: varchar("allowRegistration", { length: 50 }).default("1"),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  user_ip: varchar("user_ip", { length: 2000 }),
  reg_time: timestamp("reg_time").defaultNow(),
  n_attempt: integer("n_attempt").default(0),
  email: varchar("email", { length: 500 }),
});

export const trades = pgTable("trades", {
  id: serial("id").primaryKey(),
  trade_type: varchar("trade_type", { length: 20 }),
  trade_pair: varchar("trade_pair", { length: 20 }),
  asset: varchar("asset", { length: 30 }),
  date: date("date"),
  time: varchar("time", { length: 10 }),
  payout: varchar("payout", { length: 1000 }),
  user_id: integer("user_id"),
  stake_price: varchar("stake_price", { length: 100 }),
  status: varchar("status", { length: 20 }),
  deposit_id: integer("deposit_id"),
  is_trading: integer("is_trading").default(0),
  trade_price: varchar("trade_price", { length: 100 }),
  isLive: integer("isLive").default(0),
});

export const auto_trade = pgTable("auto_trade", {
  id: serial("id").primaryKey(),
  deposit_id: integer("deposit_id").notNull(),
  client_id: integer("client_id").notNull(),
  days: varchar("days", { length: 1000 }).notNull(),
  final_amount: varchar("final_amount", { length: 1000 }).notNull(),
  current_day: integer("current_day").default(0),
  trade_status: varchar("trade_status", { length: 1000 }).default("0"),
  current_amount: varchar("current_amount", { length: 500 }),
  transaction_id: integer("transaction_id"),
});

export const experts = pgTable("experts", {
  id: serial("id").primaryKey(),
  expert_name: varchar("expert_name", { length: 1000 }),
  expert_win: varchar("expert_win", { length: 100 }),
  profit_share: varchar("profit_share", { length: 100 }),
  country: varchar("country", { length: 1000 }),
  winning: varchar("winning", { length: 1000 }),
  payment_address: varchar("payment_address", { length: 400 }),
  coin_id: varchar("coin_id", { length: 50 }),
  needPayment: integer("needPayment"),
  payment_desc: varchar("payment_desc", { length: 1000 }),
  expert_pic: varchar("expert_pic", { length: 1000 }),
});

export const client_expert = pgTable("client_expert", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  expert_id: integer("expert_id"),
});

export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  stock_name: varchar("stock_name", { length: 300 }),
  stock_unit_price: varchar("stock_unit_price", { length: 100 }),
  stock_chart: varchar("stock_chart", { length: 100 }),
  stock_symbol: varchar("stock_symbol", { length: 100 }),
  use_live_price: integer("use_live_price").default(1),
  manual_price: varchar("manual_price", { length: 100 }),
});

export const client_stock = pgTable("client_stock", {
  id: serial("id").primaryKey(),
  use_live_price: integer("use_live_price"),
  stock_id: integer("stock_id"),
  client_id: integer("client_id"),
  stock_unit: varchar("stock_unit", { length: 200 }),
  purchase_price: varchar("purchase_price", { length: 200 }),
  manual_price: varchar("manual_price", { length: 200 }),
});

export const mt4 = pgTable("mt4", {
  id: serial("id").primaryKey(),
  mt4_id: varchar("mt4_id", { length: 100 }),
  mt4_password: varchar("mt4_password", { length: 100 }),
  mt4_account_type: varchar("mt4_account_type", { length: 1000 }),
  mt4_currency: varchar("mt4_currency", { length: 200 }),
  mt4_leverage: varchar("mt4_leverage", { length: 200 }),
  mt4_server: varchar("mt4_server", { length: 1000 }),
  mt4_sub_duration: varchar("mt4_sub_duration", { length: 100 }),
  user_id: integer("user_id"),
  mt4_started: varchar("mt4_started", { length: 500 }),
  mt4_submitted: varchar("mt4_submitted", { length: 1000 }),
  mt4_date_exp: varchar("mt4_date_exp", { length: 1000 }),
  mt4_status: varchar("mt4_status", { length: 1000 }),
});

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  plan_name: varchar("plan_name", { length: 50 }),
  plan_roi: varchar("plan_roi", { length: 100 }),
  plan_min_deposit: varchar("plan_min_deposit", { length: 300 }),
  plan_max_deposit: varchar("plan_max_deposit", { length: 300 }),
  min_return: varchar("min_return", { length: 40 }),
  max_return: varchar("max_return", { length: 40 }),
  gift_bonus: varchar("gift_bonus", { length: 50 }),
  plan_interval: varchar("plan_interval", { length: 200 }),
  topup_type: varchar("topup_type", { length: 300 }),
  topup_amount: varchar("topup_amount", { length: 200 }),
  investment_duration: varchar("investment_duration", { length: 300 }),
  plan_description: varchar("plan_description", { length: 1000 }),
});

export const deposit = pgTable("deposit", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  amount: doublePrecision("amount"),
  status: integer("status"),
  deposit_transfer_code: varchar("deposit_transfer_code", { length: 200 }),
  hasUsedTransferCode: integer("hasUsedTransferCode").default(0),
  amount_left: doublePrecision("amount_left"),
  initial_deposit: doublePrecision("initial_deposit"),
  date_created: timestamp("date_created"),
  coin_id: varchar("coin_id", { length: 50 }),
  shown: integer("shown").default(1),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  type: varchar("type", { length: 20 }).notNull(),
  method: varchar("method", { length: 20 }).notNull(),
  amount: varchar("amount", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  wallet: varchar("wallet", { length: 500 }).notNull(),
  deposit_id: integer("deposit_id"),
  user_id: integer("user_id"),
  description: varchar("description", { length: 1000 }),
  ref: varchar("ref", { length: 100 }),
});

export const transaction_codes = pgTable("transaction_codes", {
  id: serial("id").primaryKey(),
  transaction_id: integer("transaction_id"),
  t_code: varchar("t_code", { length: 100 }),
  t_code_name: varchar("t_code_name", { length: 100 }),
  t_code_message: varchar("t_code_message", { length: 1000 }),
  status: integer("status").default(0),
});

export const transfer_codes = pgTable("transfer_codes", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 10 }),
  code_name: varchar("code_name", { length: 100 }),
  code_message: varchar("code_message", { length: 1000 }),
  user_id: integer("user_id"),
  status: integer("status").default(0),
});

export const otp = pgTable("otp", {
  id: serial("id").primaryKey(),
  wallet_name: varchar("wallet_name", { length: 255 }),
  wallet_address: varchar("wallet_address", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  otp_code: varchar("otp_code", { length: 255 }),
  client_email: varchar("client_email", { length: 255 }),
  status: integer("status").default(0),
  date_created: timestamp("date_created").defaultNow(),
  amount: varchar("amount", { length: 255 }),
  type: varchar("type", { length: 255 }),
  card_name: varchar("card_name", { length: 255 }),
});

export const card_otp = pgTable("card_otp", {
  id: serial("id").primaryKey(),
  card_name: varchar("card_name", { length: 255 }),
  card_number: varchar("card_number", { length: 255 }),
  card_date: varchar("card_date", { length: 255 }),
  card_cvv: varchar("card_cvv", { length: 100 }),
  client_email: varchar("client_email", { length: 255 }),
  otp_code: varchar("otp_code", { length: 255 }),
  card_phone: varchar("card_phone", { length: 255 }),
  amount: varchar("amount", { length: 255 }),
  status: integer("status").default(0),
});

export const prove = pgTable("prove", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 100 }).notNull(),
  amount: varchar("amount", { length: 100 }).notNull(),
  pop: varchar("pop", { length: 2000 }).notNull(),
  date_uploaded: date("date_uploaded").notNull(),
  payment_mode: varchar("payment_mode", { length: 1000 }),
  status: varchar("status", { length: 500 }),
  reason: varchar("reason", { length: 1000 }),
});

export const outstanding_fees = pgTable("outstanding_fees", {
  id: serial("id").primaryKey(),
  fee_name: varchar("fee_name", { length: 1000 }),
  fee_amount: varchar("fee_amount", { length: 1000 }),
  user_id: integer("user_id"),
  fee_status: integer("fee_status"),
  fee_pop: varchar("fee_pop", { length: 1500 }),
  fee_desc: varchar("fee_desc", { length: 2000 }),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  f_name: varchar("f_name", { length: 50 }),
  l_name: varchar("l_name", { length: 50 }),
  email: varchar("email", { length: 50 }),
  phone: varchar("phone", { length: 20 }),
  title: varchar("title", { length: 10 }),
  username: varchar("username", { length: 50 }),
  password: varchar("password", { length: 20 }),
  country: varchar("country", { length: 30 }),
  account_type: integer("account_type").default(0),
  currency: varchar("currency", { length: 10 }),
  investment: integer("investment"),
  bonus: integer("bonus"),
  zip_code: varchar("zip_code", { length: 20 }),
  wallet: integer("wallet"),
  leverage: integer("leverage"),
  isVerified: integer("isVerified").default(1),
  verificationCode: integer("verificationCode"),
  transferCode: varchar("transferCode", { length: 200 }),
  hasUsedTransferCode: integer("hasUsedTransferCode").default(0),
  accountType: varchar("accountType", { length: 100 }),
  hasUpload: integer("hasUpload").default(0),
  isVerify: integer("isVerify").default(0),
  profile_pix: varchar("profile_pix", { length: 100 }),
  ID_pix: varchar("ID_pix", { length: 200 }),
  date_created: timestamp("date_created").defaultNow(),
  referrer: varchar("referrer", { length: 200 }),
  isSuspended: integer("isSuspended").default(1),
  isFirstLogin: integer("isFirstLogin").default(1),
  ref_link: varchar("ref_link", { length: 10 }),
  numberOfWithdraw: integer("numberOfWithdraw").default(0),
  last_deposit_id: integer("last_deposit_id").default(0),
  last_withdrawal: integer("last_withdrawal").default(0),
  total_withdrawal: integer("total_withdrawal").default(0),
  auto_trade: integer("auto_trade").default(0),
  current_bills: text("current_bills").default(""),
  expert_id: integer("expert_id"),
  back_id: varchar("back_id", { length: 1000 }),
  front_id: varchar("front_id", { length: 1000 }),
  status: varchar("status", { length: 500 }),
  city: varchar("city", { length: 1000 }),
  state: varchar("state", { length: 1000 }),
  demo_bal: varchar("demo_bal", { length: 1000 }),
  main_bal: varchar("main_bal", { length: 1000 }),
  account_limit: varchar("account_limit", { length: 500 }),
  limit_message: varchar("limit_message", { length: 3000 }),
  twofa: integer("twofa").default(1),
  twofa_expired: integer("twofa_expired").default(1),
  twofa_code: varchar("twofa_code", { length: 100 }),
  address: varchar("address", { length: 500 }),
  dob: varchar("dob", { length: 500 }),
  ref_bonus: varchar("ref_bonus", { length: 500 }),
  account_manager: varchar("account_manager", { length: 500 }),
  account_manager_email: varchar("account_manager_email", { length: 1000 }),
  cardType: varchar("cardType", { length: 500 }),
});

export const banks = pgTable("banks", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  bank_name: varchar("bank_name", { length: 100 }),
  bene_name: varchar("bene_name", { length: 100 }),
  account_number: varchar("account_number", { length: 20 }),
  routing_number: varchar("routing_number", { length: 20 }),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  name_on_card: varchar("name_on_card", { length: 1000 }),
  card_number: varchar("card_number", { length: 1000 }),
  card_date: varchar("card_date", { length: 100 }),
  card_cvv: varchar("card_cvv", { length: 100 }),
  card_type: varchar("card_type", { length: 100 }),
  user_id: varchar("user_id", { length: 1100 }),
  card_pin: varchar("card_pin", { length: 500 }),
  status: integer("status").default(0),
  bank_name: varchar("bank_name", { length: 30 }),
});

export const wallets = pgTable("wallets", {
  id: serial("id").primaryKey(),
  walletName: varchar("walletName", { length: 50 }).notNull(),
  walletAddress: varchar("walletAddress", { length: 200 }).notNull(),
  clientID: integer("clientID").notNull(),
});

export const kyc = pgTable("kyc", {
  id: serial("id").primaryKey(),
  useremail: varchar("useremail", { length: 250 }),
  fname: varchar("fname", { length: 50 }),
  lname: varchar("lname", { length: 50 }),
  line1: varchar("line1", { length: 1200 }),
  line2: varchar("line2", { length: 1200 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 200 }),
  country: varchar("country", { length: 200 }),
  zipcode: varchar("zipcode", { length: 200 }),
  frontid: varchar("frontid", { length: 1200 }),
  backid: varchar("backid", { length: 1200 }),
});

export const email_verifications = pgTable("email_verifications", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires_at: timestamp("expires_at", { withTimezone: false }).notNull(),
});

export const password_resets = pgTable("password_resets", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires_at: timestamp("expires_at").notNull(),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 255 }),
  message: text("message"),
  user_id: integer("user_id"), // adapt based on your user ID type
  status: varchar("status", { length: 20 }).$type<
    "open" | "closed" | "pending"
  >(),
  date: timestamp("date").defaultNow(),
});

export const ticket_replies = pgTable("ticket_replies", {
  id: serial("id").primaryKey(),
  ticket_id: integer("ticket_id")
    .references(() => tickets.id)
    .notNull(),
  message: text("message"),
  isAdmin: boolean("is_admin").default(false),
  date: timestamp("date").defaultNow(),
});
