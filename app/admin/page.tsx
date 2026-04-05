import { requireAdminUser } from "@/lib/auth-admin";
import { getAllUsers, getUserByKindeId } from "@/actions/users";
// import { UserTableClient } from "@/components/admin/UserTableClient";
import { Users } from "lucide-react";
import { UserTableClient } from "../components/admin/UserTableClient";
import { getUser } from "@/lib/kinde";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  // 1. Protect route – redirect if not admin
  // await requireAdmin();

  await requireAdminUser();

  // 2. Fetch all users from MongoDB
  const users = await getAllUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-slate-600">
            Manage user accounts, approve pending registrations, and update
            roles.
          </p>
        </div>

        {/* Client Component – receives initial users as prop */}
        <UserTableClient initialUsers={users} />
      </div>
    </div>
  );
}
