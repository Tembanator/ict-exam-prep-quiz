"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/Button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useAdminStatus } from "@/hooks/useAdminStatus";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();
  const { isAdmin } = useAdminStatus(); // use the custom hook

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="font-bold text-xl text-slate-900">
              0417<span className="text-indigo-600">ICT</span> Exam Prep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated && (
              <>
                <LoginLink>
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </RegisterLink>
              </>
            )}
            {isAuthenticated && (
              <>
                {/* Only show Admin button if user is approved admin */}
                {isAdmin && (
                  <Button href="/admin" variant="primary" size="sm">
                    Admin
                  </Button>
                )}
                <LogoutLink>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </LogoutLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
            {!isAuthenticated && (
              <>
                <LoginLink>
                  <Button variant="outline" size="sm" className="w-full">
                    Log In
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant="primary" size="sm" className="w-full">
                    Get Started
                  </Button>
                </RegisterLink>
              </>
            )}
            {isAuthenticated && (
              <>
                {isAdmin && (
                  <Button
                    href="/admin"
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Admin
                  </Button>
                )}
                <LogoutLink>
                  <Button variant="outline" size="sm" className="w-full">
                    Logout
                  </Button>
                </LogoutLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
