import { Resend } from "resend";
import WelcomeEmail from "@/emails/Welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(request: Request) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "thembadlamini365@gmail.com",
    subject: "hello world",
    react: WelcomeEmail(),
  });
}
