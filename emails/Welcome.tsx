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

// interface WelcomeEmailProps {
//   userName?: string;
// }

// Ensure images have absolute URLs so they render in email clients
const baseUrl = process.env.RENDER_URL
  ? `https://${process.env.RENDER_URL}`
  : "http://localhost:3000";

export const WelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ICT Exam Prep - Application Received</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#553DF4", // The primary purple from your logo
                brandDark: "#3A3C9A", // The darker blue from the text
              },
            },
          },
        }}
      >
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px] bg-white p-[40px] rounded-xl shadow-sm border border-[#e6ebf1]">
            {/* Logo from /public folder */}
            <Section className="text-center mb-[32px]">
              <Img
                src={`${baseUrl}/ICT%20EXAM.png`}
                alt="ICT Exam Prep"
                width="140"
                className="mx-auto"
              />
            </Section>

            <Heading className="text-[24px] font-bold text-center text-brand leading-[32px] mb-[24px]">
              Welcome to ICT Exam Prep!
            </Heading>

            <Section>
              <Text className="text-[16px] leading-[24px] text-[#525f7f]">
                Hi student,
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#525f7f]">
                Thank you for registering. We’ve received your application to
                join our platform.
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#525f7f]">
                To maintain the quality of our learning community, all new
                accounts are reviewed by an administrator. Your account will be{" "}
                <strong>approved within 24-48 hours</strong>.
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#525f7f]">
                You will receive a confirmation email once your access is
                active. In the meantime, you can visit our homepage to learn
                more about our exam resources.
              </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-brand rounded-md text-white text-[16px] font-semibold no-underline text-center px-[24px] py-[12px]"
                href="https://ict-exam-prep.onrender.com/"
              >
                Go to Homepage
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
                  href="https://ict-exam-prep.onrender.com/"
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

export default WelcomeEmail;
