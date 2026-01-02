import { TicketWithReplies, TransactionType } from '.';

// Mock data for demonstration
// export const MOCK_CLIENT: ClientType = {
//   city: "New York",
//   ref_bonus: "0",
//   status_text: "active",
//   state: "NY",
//   twofa_code: "123456",
//   twofa_expired: 1,
//   cardType: "Visa",
//   ref_link: "https://example.com/referral?code=12345",
//   last_deposit_id: 1,
//   last_withdrawal: 1,
//   numberOfWithdraw: 1,
//   total_withdrawal: 1000,
//   current_bills: "0",
//   auto_trade: 0,
//   expert_id: 1,
//   back_id: "1",
//   front_id: "1",
//   id: 1,
//   f_name: "John",
//   l_name: "Doe",
//   email: "john.doe@example.com",
//   phone: "+1234567890",
//   password: "1234567",
//   title: "Mr",
//   username: "johndoe",
//   country: "United States",
//   account_type: 2,
//   currency: "USD",
//   investment: 5000,
//   bonus: 500,
//   wallet: 6200,
//   leverage: 10,
//   isVerified: 1,
//   hasUpload: 1,
//   isVerify: 1,
//   profile_pix:
//     "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
//   ID_pix: null,
//   isSuspended: 0,
//   demo_bal: "1000",
//   main_bal: "6200",
//   account_limit: "10000",
//   limit_message: null,
//   twofa: 1,
//   address: "123 Main St, New York, NY",
//   dob: "1990-01-01",
//   account_manager: "Sarah Johnson",
//   account_manager_email: "sarah.johnson@company.com",
//   status: "active",
//   zip_code: "11111",
//   verificationCode: 12223,
//   transferCode: "11111",
//   date_created: new Date(),
//   hasUsedTransferCode: null,
//   accountType: null,
//   referrer: null,
//   isFirstLogin: null,
//   // Add other missing properties with default values or null as needed
// };

// Mock ticket data
export const MOCK_TICKETS: TicketWithReplies[] = [
  {
    id: 1,
    subject: 'Withdrawal Issue',
    user_id: 1,
    message:
      "I'm having trouble with my recent withdrawal request. It's been pending for 3 days now.",
    status: 'open',
    date: new Date('2023-06-10T15:30:00Z'),
    replies: [
      {
        id: 1,
        ticket_id: 1,
        message:
          "We're looking into this issue and will resolve it within 24 hours.",
        date: new Date('2023-06-10T16:00:00Z'),
        isAdmin: true,
      },
      {
        id: 2,
        message:
          "Thank you for your prompt response. I'll wait for the resolution.",
        date: new Date('2023-06-10T17:00:00Z'),
        ticket_id: 1,
        isAdmin: false,
      },
    ],
  },
  {
    id: 2,
    subject: 'Account Verification',
    user_id: 1,
    message:
      "I've uploaded my documents but my account is still showing as unverified.",
    status: 'closed',
    date: new Date('2023-05-20T10:00:00Z'),
    replies: [
      {
        id: 3,
        ticket_id: 2,
        message:
          'Your documents have been reviewed and your account is now verified.',
        date: new Date('2023-05-20T11:00:00Z'),
        isAdmin: true,
      },
    ],
  },
];

export const MOCK_TRANSACTIONS: TransactionType[] = [
  {
    id: 1,
    type: 'deposit',
    amount: '2000',
    user_currency: 'USD',
    status: 'completed',
    date: '2023-05-15',
    wallet: 'Main Wallet',
    user_id: 1,
    deposit_id: 1,
    description: 'Deposit to main wallet',
    ref: '123456789',
    method: 'Credit Card',
    user_email: 'dognfas@gmail.com',
  },
];
