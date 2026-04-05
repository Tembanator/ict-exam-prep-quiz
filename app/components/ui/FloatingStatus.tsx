"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useUserFromDB } from "@/hooks/useUserFromDB";

export function FloatingStatus() {
  const { isAuthenticated, getUser } = useKindeBrowserClient();
  const kindeUser = getUser();
  const kindeId = kindeUser?.id;

  // Fetch user from DB using the current user's kindeId (only if authenticated)
  const { user, loading } = useUserFromDB({
    kindeId: kindeId || undefined,
    autoFetch: (isAuthenticated && !!kindeId) || false,
  });

  // Don't show anything if not authenticated or still loading
  if (!isAuthenticated || loading) return null;

  // Fallback if user not found in DB yet
  if (!user) return null;

  const statusConfig = {
    approved: {
      label: "Approved",
      icon: CheckCircle,
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-300",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-300",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-300",
    },
  };

  const statusKey = user.status as keyof typeof statusConfig;
  const config = statusConfig[statusKey];

  // Only show for approved, pending, or rejected
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right-5 duration-300">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border ${config.bgColor} ${config.textColor} ${config.borderColor} backdrop-blur-sm bg-opacity-90`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    </div>
  );
}
