import { Resend } from "resend";
import process from "process";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail(to: string, subject: string, message: string) {
  resend.emails.send({
    from: process.env.RESEND_SENDER as string,
    to,
    subject,
    html: message,
  });
}
