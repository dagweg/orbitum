import * as nodemailer from "nodemailer";
import * as process from "process";
import { getHourGap } from "./date";

export const createTransport = nodemailer.createTransport;

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL as string,
        pass: process.env.MAILER_PASSWORD as string,
      },
    });
    transporter.sendMail(
      {
        from: process.env.MAILER_EMAIL,
        to,
        subject,
        html,
      },
      (error, info) => {
        console.log("What happened");
        if (error) console.log((error as Error).message);
        else console.log("Email sent: " + info.response);
      }
    );
  } catch (error) {
    console.log((error as Error).message);
  }
}

export async function sendOtpEmail(
  receiverEmail: string,
  otp: string,
  otpExpiry: Date
) {
  const expiryHours = getHourGap(otpExpiry, new Date());

  if (expiryHours <= 0)
    throw new Error("OTP has already expired. Please set another OTP");

  const emailBody = `<p>Thanks for registering to Orbitum.<br>Here is your OTP: <strong>${otp}</strong>.<br> It is to expire after ${expiryHours} hours at ${otpExpiry.toLocaleString()}</p>`;

  await sendEmail(receiverEmail, "Account Verification OTP", emailBody);
}
