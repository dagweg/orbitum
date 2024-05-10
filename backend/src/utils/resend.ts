import { Resend } from "resend";
import process from "process";

export async function sendMail(to: string, subject: string, message: string) {
  try {
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // console.log(process.env.RESEND_API_KEY);
    // console.log(process.env.RESEND_SENDER);
    // resend.emails.send({
    //   from: process.env.RESEND_SENDER as string,
    //   to: "dagtef@gmail.com",
    //   subject: subject,
    //   html: message,
    // });
    // console.log(resend);
    const resend = new Resend("re_5KN2xfeL_N7iBz3hfzS5s2r5Fhx2ApZ6B");

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "orbitum.staff@gmail.com",
      subject: "Bruh",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
    return true;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
}
