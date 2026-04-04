
import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div>
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Or{" "}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-slate-600">Login functionality coming soon with Kinde authentication.</p>
        </div>
        
        <Button href="/" variant="outline" className="w-full">
          Back to Home
        </Button>
      </div>
    </div>
  );
}