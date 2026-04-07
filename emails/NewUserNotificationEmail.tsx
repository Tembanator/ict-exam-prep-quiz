import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface NewUserNotificationProps {
  name: string;
  email: string;
  userRole?: string;
  registrationDate?: string;
  adminDashboardUrl?: string;
  approveUrl?: string;
  rejectUrl?: string;
}

export const NewUserNotificationEmail = ({
  name,
  email,
  userRole = "Pending Approval",
  registrationDate = new Date().toLocaleString(),
  adminDashboardUrl = "https://ict-exam-prep.onrender.com/admin",
  approveUrl = "https://ict-exam-prep.onrender.com/api/admin",
  rejectUrl = "https://ict-exam-prep.onrender.com/api/admin",
}: NewUserNotificationProps) => {
  const previewText = `New user registration: ${name} (${email})`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans p-6">
          <Container className="mx-auto my-10 max-w-[600px] bg-white p-10 rounded-xl shadow-sm border border-[#e6ebf1]">
            {/* Logo */}
            <Section className="text-center mb-8">
              <Img
                src="https://moccasin-main-rattlesnake-486.mypinata.cloud/ipfs/bafkreihwt63rhgxwbicly5z3vcrgnbm3yhav2tuokgbff3yluecqvsaaie"
                alt="ICT Exam Prep"
                width="140"
                className="mx-auto"
              />
            </Section>

            <Heading className="text-2xl font-bold text-center text-[#553DF4] leading-8 mb-6">
              🆕 New User Registration
            </Heading>

            <Text className="text-base leading-6 text-[#525f7f] mb-4">
              A new user has registered on <strong>ICT Exam Prep</strong> and is
              awaiting your approval.
            </Text>

            {/* User Details Card */}
            <Section className="bg-[#f8fafc] rounded-lg p-6 my-6 border border-[#e2e8f0]">
              <Text className="text-sm font-semibold text-[#1e293b] mb-3">
                User Information:
              </Text>

              <Text className="text-sm text-[#334155] mb-2">
                <strong>Name:</strong> {name}
              </Text>

              <Text className="text-sm text-[#334155] mb-2">
                <strong>Email:</strong>{" "}
                <Link href={`mailto:${email}`} className="text-[#553DF4]">
                  {email}
                </Link>
              </Text>

              <Text className="text-sm text-[#334155] mb-2">
                <strong>Role:</strong> {userRole}
              </Text>

              <Text className="text-sm text-[#334155]">
                <strong>Registered on:</strong> {registrationDate}
              </Text>
            </Section>

            <Text className="text-base leading-6 text-[#525f7f] mb-6">
              Please review this application. You can approve or reject it using
              the buttons below, or manage all users from the admin dashboard.
            </Text>

            {/* Action Buttons - Using table layout for email clients */}
            <Section className="text-center mt-8 mb-8">
              <table align="center" className="mx-auto">
                <tbody>
                  <tr>
                    <td align="center" className="pb-4 pr-2">
                      <Button
                        className="bg-[#10b981] rounded-md text-white text-base font-semibold no-underline text-center px-6 py-3"
                        href={approveUrl}
                      >
                        ✅ Approve User
                      </Button>
                    </td>
                    <td align="center" className="pb-4 pl-2">
                      <Button
                        className="bg-[#ef4444] rounded-md text-white text-base font-semibold no-underline text-center px-6 py-3"
                        href={rejectUrl}
                      >
                        ❌ Reject User
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Section className="text-center mb-8">
              <Button
                className="bg-[#553DF4] rounded-md text-white text-base font-semibold no-underline text-center px-6 py-3"
                href={adminDashboardUrl}
              >
                📋 Go to Admin Dashboard
              </Button>
            </Section>

            <Hr className="border-[#e6ebf1] my-6" />

            <Text className="text-sm leading-5 text-[#8898aa] mb-4">
              <strong>Note:</strong> The user will receive an email notification
              automatically after you take action. You can also add a custom
              message when approving/rejecting from the dashboard.
            </Text>

            <Text className="text-base leading-6 text-[#525f7f]">
              Best regards,
              <br />
              <strong>ICT Exam Prep Admin System</strong>
            </Text>

            <Section className="mt-10 pt-5 border-t border-[#e6ebf1]">
              <Text className="text-xs text-[#8898aa] text-center">
                This is an automated notification. You are receiving this
                because you are an administrator of{" "}
                <Link
                  href="https://ict-exam-prep.onrender.com"
                  className="text-[#3A3C9A] underline"
                >
                  ict-exam-prep.onrender.com
                </Link>
                . If you did not expect this, please check your security
                settings.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewUserNotificationEmail;
