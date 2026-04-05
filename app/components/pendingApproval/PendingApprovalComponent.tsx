"use client";
import React from "react";
import { Clock, LogOut, Mail } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "../ui/Button";
import { redirect, useRouter } from "next/navigation";

export default function PendingApprovalComponent() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
          {/* Icon */}
          <div className="inline-flex p-3 bg-amber-100 rounded-full mb-6">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Account Pending Approval
          </h1>

          {/* Message */}
          <div className="space-y-4 text-slate-600">
            <p>
              Thank you for registering! Your account has been created and is
              awaiting verification by the administrator.
            </p>
            <p className="text-sm">
              Once approved, you'll receive access to all 21 chapters of the
              0417 ICT quiz content. This process typically takes 24-48 hours.
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-blue-900">
                  What's next?
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  You'll receive an email notification once your account is
                  activated. You can then log in and start practicing.
                </p>
              </div>
            </div>
          </div>

          {/* Auto-refresh info */}
          {/* <p className="text-xs text-slate-500 mt-6">
            Page will auto-refresh in {countdown} seconds to check status
          </p> */}

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <Button
              onClick={() => redirect("/auth-callback")}
              variant="outline"
              size="md"
              className="w-full"
            >
              Check Status Now
            </Button>
            <LogoutLink>
              <Button variant="secondary" size="md" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </LogoutLink>
          </div>
        </div>
      </div>
    </div>
  );
}
