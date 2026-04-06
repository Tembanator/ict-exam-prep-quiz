import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { Navbar } from "./components/landing/Navbar";
import { FloatingStatus } from "./components/ui/FloatingStatus";
import Footer from "./components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "0417 ICT Exam Quiz | Master Your ICT Exams",
  description:
    "Comprehensive quiz application for 0417 ICT students. 21 chapters of theory and practical content with detailed explanations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <AuthProvider>
          {children}
          <FloatingStatus />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
