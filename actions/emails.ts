import { Resend } from "resend";
import WelcomeEmail from "@/emails/Welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async () => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "thembadlamini365@gmail.com",
      subject: "hello world",
      react: WelcomeEmail(),
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};
