import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createOrSyncUser } from "@/actions/users";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default async function AuthCallbackPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id || !user.email) {
    // If no session exists, kick them back to home
    redirect("/");
  }

  // 1. Sync the user data with your DB
  const result = await createOrSyncUser({
    kindeId: user.id,
    email: user.email,
    firstName: user.given_name || "",
    lastName: user.family_name || "",
  });

  // 2. Handle failure
  if (!result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30">
        <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
          <div className="mb-6 inline-flex p-3 bg-red-100 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Registration failed
          </h2>
          <p className="text-slate-600 mb-6">
            {result.message || "An unexpected error occurred"}
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
            <p className="font-medium">Please try again</p>
            <p className="mt-1">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Handle Success (Server-side redirect)
  // Note: If you want to show the "Success" UI for 2 seconds like before,
  // you would actually need a Client Component for the timer.
  // However, for a better UX, we redirect immediately once synced.
  redirect("/");

  // This part technically won't render due to redirect,
  // but kept for UI reference if you decide to use a delay client-side.
  return null;
}
