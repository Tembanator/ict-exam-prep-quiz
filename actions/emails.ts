import { Resend } from "resend";
import WelcomeEmail from "@/emails/Welcome";
import StatusChangeEmail from "@/emails/StatusChangeEmail";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmailResnd = async (name: string, email: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "hello world",
      react: WelcomeEmail({ name }),
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "thembadlamini365@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (name: string, email: string) => {
  try {
    const emailHtml = await render(WelcomeEmail({ name }));

    const options = {
      from: "thembadlamini365@gmail.com",
      to: email,
      subject: "hello world",
      html: emailHtml,
    };

    await transporter.sendMail(options);
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
