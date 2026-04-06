import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface StatusChangeEmailProps {
  name?: string;
  status: "approved" | "rejected" | "pending";
  customMessage?: string;
}

// const baseUrl = process.env.RENDER_URL
//   ? `https://${process.env.RENDER_URL}`
//   : "http://localhost:3000";

export const StatusChangeEmail = ({
  name = "Student",
  status,
  customMessage,
}: StatusChangeEmailProps) => {
  const getPreview = () => {
    if (status === "approved") return "Your account has been approved!";
    if (status === "rejected") return "Update on your account application";
    return "Your application is being reviewed";
  };

  const getHeading = () => {
    if (status === "approved") return "Account Approved! 🎉";
    if (status === "rejected") return "Application Update";
    return "Application Received";
  };

  const getMainMessage = () => {
    if (status === "approved") {
      return `Great news, ${name}! Your account has been approved. You can now log in and start practicing with all 21 chapters of 0417 ICT content.`;
    }
    if (status === "rejected") {
      return `Hi ${name}, after careful review, your application could not be approved at this time. If you believe this is an error, please contact support.`;
    }
    return `Hi ${name}, thank you for registering. We’ve received your application and it is pending administrator approval. You’ll receive another email once your account is active.`;
  };

  const getButtonText = () => {
    if (status === "approved") return "Log In Now";
    return "Go to Homepage";
  };

  const getButtonHref = () => {
    if (status === "approved")
      return `https://ict-exam-prep.onrender.com/auth-callback`;
    return `https://ict-exam-prep.onrender.com/`;
  };

  const getExtraNote = () => {
    if (status === "approved") {
      return "Start practicing immediately with theory and practical questions, detailed explanations, and progress tracking.";
    }
    if (status === "rejected") {
      return "If you have questions, please reach out to our support team.";
    }
    return "Approval typically takes 24-48 hours. You'll receive a confirmation email once your access is active.";
  };

  return (
    <Html>
      <Head />
      <Preview>{getPreview()}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#553DF4",
                brandDark: "#3A3C9A",
              },
            },
          },
        }}
      >
        <Body className="bg-[#f6f9fc] font-sans p-6">
          <Container className="mx-auto my-10 max-w-[600px] bg-white p-10 rounded-xl shadow-sm border border-[#e6ebf1]">
            {/* Logo */}
            <Section className="text-center mb-[32px]">
              <Img
                src={`https://moccasin-main-rattlesnake-486.mypinata.cloud/ipfs/bafkreihwt63rhgxwbicly5z3vcrgnbm3yhav2tuokgbff3yluecqvsaaie`}
                alt="ICT Exam Prep"
                width="140"
                className="mx-auto"
              />
            </Section>

            <Heading className="text-[24px] font-bold text-center text-brand leading-[32px] mb-[24px]">
              {getHeading()}
            </Heading>

            <Section>
              <Text className="text-[16px] leading-[24px] text-[#525f7f]">
                {getMainMessage()}
              </Text>

              {customMessage && (
                <Text className="text-[16px] leading-[24px] text-[#525f7f] italic">
                  "{customMessage}"
                </Text>
              )}

              <Text className="text-[16px] leading-[24px] text-[#525f7f]">
                {getExtraNote()}
              </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-brand rounded-md text-white text-[16px] font-semibold no-underline text-center px-[24px] py-[12px]"
                href={getButtonHref()}
              >
                {getButtonText()}
              </Button>
            </Section>

            <Text className="text-[16px] leading-[24px] text-[#525f7f]">
              Best regards,
              <br />
              <strong>The ICT Exam Prep Team</strong>
            </Text>

            <Section className="mt-[40px] border-t border-[#e6ebf1] pt-[20px]">
              <Text className="text-[12px] text-[#8898aa] text-center">
                This is an automated message. If you didn't request this, please
                ignore this email. Visit us at{" "}
                <Link
                  href={"https://ict-exam-prep.onrender.com"}
                  className="text-brandDark underline"
                >
                  ict-exam-prep.onrender.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default StatusChangeEmail;
