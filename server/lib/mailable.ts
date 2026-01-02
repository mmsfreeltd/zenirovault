import { SITE_URL_WITH_HTTPS, SITE_NAME } from "@/global/constants";

export function emailVerificationTemplate(url: string): string {
  const verify = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
      <h2>Email Verification</h2>
      <p>Thank you for registering on ${SITE_NAME}.</p>
      <p>Please click the link below to verify your email address:</p>
      <p><a href="${url}" style="color: #007bff;">Verify Email</a></p>
      <p>This link will expire in 15 minutes.</p>
    </div>
  `;
  return mailLayout(verify);
}

export function welcomeEmailTemplate(name: string): string {
  const welcome = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
      <h2>Welcome to ${SITE_NAME}, ${name} 👋</h2>
      <p>We're excited to have you on board.</p>
      <p>You can now start trading, depositing crypto, and exploring all the features we offer.</p>
      <p>Let us know if you ever need help!</p>
      <p>– The ${SITE_NAME} Team</p>
    </div>
  `;
  return mailLayout(welcome);
}

export function passwordResetTemplate(url: string): string {
  const reset = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password. If this was you, click the link below:</p>
      <p><a href="${url}" style="color: #007bff;">Reset your password</a></p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <p>This link expires in 15 minutes.</p>
    </div>
  `;

  return mailLayout(reset);
}

export function emailTransactionTemplate(
  user: { f_name: string; l_name: string },
  tx: {
    amount: string;
    coin_amount: number;
    coin_name: string;
    coin_logo: string;
    date: Date;
    ref: string;
  }
): string {
  const transaction = `
    <div style="font-family: sans-serif; line-height:1.6; color:#333">
      <h2>Deposit Confirmed</h2>
      <p>Hi ${user.f_name},</p>
      <p>Your deposit of <strong>${
        tx.amount
      }</strong> has been credited on <strong>${tx.date.toLocaleString()}</strong>.</p>
      <p>That amount equals <strong>${tx.amount} ${tx.coin_name}</strong>.</p>
      <p>Transaction Reference: <code>${tx.ref}</code></p>
      <div style="margin-top:1rem;">
        <img src="${tx.coin_logo}" alt="${
    tx.coin_name
  }" style="height:32px;width:32px;"/>
      </div>
      <p style="margin-top:1rem;">Thank you for using ${SITE_NAME}!</p>
    </div>
  `;

  return mailLayout(transaction);
}

export function emailWithdrawalTransactionTemplate(
  user: { f_name: string; l_name: string },
  tx: {
    amount: string;
    coin_amount: number;
    coin_name: string;
    coin_logo: string;
    date: Date;
    ref: string;
  }
): string {
  const transaction = `
    <div style="font-family: sans-serif; line-height:1.6; color:#333">
      <h2>Withdrawal Initiated Successfully </h2>
      <p>Hi ${user.f_name},</p>
      <p>Your withdrawal request  of <strong>${
        tx.amount
      }</strong> has been received on <strong>${tx.date.toLocaleString()}</strong>.</p>
      <p>Your Withdrawal request is being processed, you will be notified when the status of this withdrawal is updated</p>
      <p>That amount equals <strong>${tx.amount} ${tx.coin_name}</strong>.</p>
      <p>Transaction Reference: <code>${tx.ref}</code></p>
      
      <div style="margin-top:1rem;">
        <img src="${tx.coin_logo}" alt="${
    tx.coin_name
  }" style="height:32px;width:32px;"/>
      </div>
      <p style="margin-top:1rem;">Thank you for using ${SITE_NAME}!</p>
    </div>
  `;

  return mailLayout(transaction);
}

export function sendNotificationMail(message: string): string {
  const notify = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
      <h2>Notification</h2>
      <p>${message}</p>
    </div>
  `;
  return mailLayout(notify);
}

export function mailLayout(message: string): string {
  return `
  <div style="background-color: #f0f2f5; padding: 40px 0; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">

      <!-- Header with Logo -->
      <div style="background-color: #4a90e2; text-align: center; padding: 40px 0;">
        <img src="${SITE_URL_WITH_HTTPS}/images/logo.png" alt="Logo" style="height: 60px;" />
      </div>

      <!-- Main Content -->
      <div style="padding: 40px 30px;">
        <p style="font-size: 16px; color: #555555; text-align: center; margin-bottom: 30px;">
          ${message}
        </p>

   
        <!-- Additional Info -->
        <p style="font-size: 14px; color: #666666; text-align: center;">
          If you have any questions, just reply to this email — we're always happy to help.
        </p>
        <p style="font-size: 14px; color: #666666; text-align: center; margin-top: 20px;">
          — The Team
        </p>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #eeeeee; padding: 20px 30px; text-align: center; font-size: 12px; color: #999999;">
        <p style="margin: 0 0 10px;">
          <a href="#" style="color: #4a90e2; text-decoration: none;">Dashboard</a> ·
          <a href="#" style="color: #4a90e2; text-decoration: none;">Billing</a> ·
          <a href="#" style="color: #4a90e2; text-decoration: none;">Help</a>
        </p>
        <p style="margin: 0 0 10px;">
          If these emails get annoying, please <a href="#" style="color: #4a90e2;">unsubscribe</a>.
        </p>
        <p style="margin: 0;">Contoso · 1234 Main Street · Anywhere, MA 56789</p>
      </div>
    </div>
  </div>
  `;
}
