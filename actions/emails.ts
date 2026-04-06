import { Resend } from "resend";
import WelcomeEmail from "@/emails/Welcome";
import StatusChangeEmail from "@/emails/StatusChangeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (name: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "thembadlamini365@gmail.com",
      subject: "hello world",
      react: WelcomeEmail({ name }),
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};

export const sendStatusChangeEmail = async (
  name: string,
  email: string,
  status: "approved" | "rejected" | "pending",
) => {
  try {
    if (status === "approved") {
      // When admin approves a user
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your account has been approved",
        react: StatusChangeEmail({
          name: name,
          status: "approved",
          customMessage: "Welcome aboard! Start preparing for your exams now.",
        }),
      });
    }

    if (status === "rejected") {
      // When admin rejects a user
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Application update",
        react: StatusChangeEmail({
          name: name,
          status: "rejected",
          customMessage:
            "Please contact support if you think this is an error.",
        }),
      });
    }

    if (status === "pending") {
      // When admin rejects a user
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Application update",
        react: StatusChangeEmail({
          name: name,
          status: "rejected",
          customMessage:
            "Please contact support if you think this is an error.",
        }),
      });
    }
  } catch (error) {
    console.error("Failed to send status change email:", error);
  }
};
