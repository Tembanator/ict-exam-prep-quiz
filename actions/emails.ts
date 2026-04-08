// import { Resend } from "resend";
import WelcomeEmail from "@/emails/Welcome";
import StatusChangeEmail from "@/emails/StatusChangeEmail";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { NewUserNotificationEmail } from "@/emails/NewUserNotificationEmail";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendWelcomeEmailResnd = async (name: string, email: string) => {
//   try {
//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: "hello world",
//       react: WelcomeEmail({ name }),
//     });
//   } catch (error) {
//     console.error("Failed to send welcome email:", error);
//   }
// };

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.GOOGLE_APP_PASSWORD,
//   },
// });
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (name: string, email: string) => {
  try {
    // Step 1: Verify connection configuration
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("Transporter verification error:", error);
          reject(error);
        } else {
          console.log("Server is ready to send messages");
          resolve(success);
        }
      });
    });

    // Step 2: Render email HTML
    const emailHtml = await render(WelcomeEmail({ name }));

    // Step 3: Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to 0417 ICT Exam Prep!",
      html: emailHtml,
    };

    // Step 4: Send email
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Send mail error:", err);
          reject(err);
        } else {
          console.log("Email sent:", info.messageId);
          resolve(info);
        }
      });
    });

    console.log(`Welcome email sent successfully to ${email}`);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error; // rethrow if caller needs to handle
  }
};
// export const sendWelcomeEmail = async (name: string, email: string) => {
//   try {
//     const emailHtml = await render(WelcomeEmail({ name }));

//     const options = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Welcome to 0417 ICT Exam Prep!",
//       html: emailHtml,
//     };

//     await transporter.sendMail(options);
//   } catch (error) {
//     console.error("Failed to send welcome email:", error);
//   }
// };

export const sendNewUserNotificationEmail = async (
  name: string,
  email: string,
) => {
  try {
    const emailHtml = await render(NewUserNotificationEmail({ name, email }));

    const options = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin email
      subject: "We have a new user!",
      html: emailHtml,
    };

    await transporter.sendMail(options);
  } catch (error) {
    console.error("Failed to send new user notification email:", error);
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
