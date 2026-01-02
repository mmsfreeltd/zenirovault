import { transporter } from "@/server/lib/nodemailer";
import {
  emailVerificationTemplate,
  welcomeEmailTemplate,
  passwordResetTemplate,
  emailTransactionTemplate,
  emailWithdrawalTransactionTemplate,
  sendNotificationMail,
} from "@/server/lib/mailable";
import { SITE_NAME, SITE_URL_WITH_HTTPS } from "@/global/constants";

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${SITE_URL_WITH_HTTPS}/api/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Verify your email",
    html: emailVerificationTemplate(verifyUrl),
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: `Welcome to ${SITE_NAME}!`,
    html: welcomeEmailTemplate(name),
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${SITE_URL_WITH_HTTPS}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Reset your password",
    html: passwordResetTemplate(resetUrl),
  });
}

export async function sendTransactionEmail(
  to: string,
  subject: string,
  user: { f_name: string; l_name: string; email: string; currency: string },
  tx: {
    amount: string;
    coin_amount: number;
    coin_name: string;
    coin_logo: string;
    date: Date;
    ref: string;
  }
) {
  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html: emailTransactionTemplate(user, tx),
  });
}

export async function sendWithdrawalEmail(
  to: string,
  subject: string,
  user: { f_name: string; l_name: string; email: string; currency: string },
  tx: {
    amount: string;
    coin_amount: number;
    coin_name: string;
    coin_logo: string;
    date: Date;
    ref: string;
  }
) {
  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html: emailWithdrawalTransactionTemplate(user, tx),
  });
}

export async function sendMail(to: string, subject: string, message: string) {
  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html: sendNotificationMail(message),
  });
}
