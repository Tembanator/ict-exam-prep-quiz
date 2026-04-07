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
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (name: string, email: string) => {
  try {
    const emailHtml = await render(WelcomeEmail({ name }));

    const options = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to 0417 ICT Exam Prep!",
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

      const emailHtml = await render(
        StatusChangeEmail({
          name: name,
          status: "approved",
          customMessage: "Welcome aboard! Start preparing for your exams now.",
        }),
      );

      const options = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your account has been approved",
        html: emailHtml,
      };

      await transporter.sendMail(options);
    }

    if (status === "rejected") {
      // When admin rejects a user

      const emailHtml = await render(
        StatusChangeEmail({
          name: name,
          status: "rejected",
          customMessage:
            "Please contact support if you think this is an error.",
        }),
      );

      const options = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your application has been rejected",
        html: emailHtml,
      };

      await transporter.sendMail(options);
    }

    if (status === "pending") {
      // When admin rejects a user

      const emailHtml = await render(
        StatusChangeEmail({
          name: name,
          status: "rejected",
          customMessage:
            "Please contact support if you think this is an error.",
        }),
      );

      const options = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your application has been rejected",
        html: emailHtml,
      };

      await transporter.sendMail(options);
    }
  } catch (error) {
    console.error("Failed to send status change email:", error);
  }
};
