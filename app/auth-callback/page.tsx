export const dynamic = "force-dynamic";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
// import { createOrSyncUser } from "@/actions/user"; // fixed import path
import { AlertCircle } from "lucide-react";
import { createOrSyncUser } from "@/actions/users";
import { send } from "process";
import { sendWelcomeEmail } from "@/actions/emails";

export default async function AuthCallbackPage() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  // If no user from Kinde, redirect to home
  if (!kindeUser || !kindeUser.id || !kindeUser.email) {
    redirect("/");
  }

  // Sync user with MongoDB
  const result = await createOrSyncUser({
    kindeId: kindeUser.id,
    email: kindeUser.email,
    firstName: kindeUser.given_name || "",
    lastName: kindeUser.family_name || "",
  });

  if (result) {
    // Handle sync failure
    if (!result.success) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30">
          <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
            <div className="mb-6 inline-flex p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Registration Failed
            </h2>
            <p className="text-slate-600 mb-6">
              {result.message ||
                "An unexpected error occurred while creating your account."}
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
              <p className="font-medium">Please try again</p>
              <p className="mt-1">If the problem persists, contact support.</p>
            </div>
          </div>
        </div>
      );
    }
  }

  // Successful sync – route based on user status and role
  const { user, isNew } = result;

  // New user → pending approval page
  if (isNew) {
    await sendWelcomeEmail(user.firstName || "there"); // Send welcome email to new user

    redirect("/pending-approval");
  }

  // Existing user – check status & role
  if (user) {
    if (user.status === "approved" && user.role === "active") {
      redirect("/chapters");
    }
    if (user.status === "approved" && user.role === "admin") {
      redirect("/admin");
    }
  }

  // Fallback for any other case (e.g., pending but not new)
  redirect("/pending-approval");
}
