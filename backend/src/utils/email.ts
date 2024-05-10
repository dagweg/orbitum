import nodemailer, { Transport } from "nodemailer";
import process from "process";

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
