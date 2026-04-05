"use client";

import { useState } from "react";
import { updateUserRoleAndStatus, deleteUser } from "@/actions/users";
import {
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  User as UserIcon,
  Trash2,
  RefreshCw,
} from "lucide-react";

// TypeScript interface for User (simplified)
interface User {
  kindeId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: "pending" | "active" | "admin";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface UserTableClientProps {
  initialUsers: User[];
}

// Badge Components
const StatusBadge = ({ status }: { status: User["status"] }) => {
  const config = {
    pending: {
      icon: Clock,
      class: "bg-yellow-100 text-yellow-800",
      label: "Pending",
    },
    approved: {
      icon: CheckCircle,
      class: "bg-green-100 text-green-800",
      label: "Approved",
    },
    rejected: {
      icon: XCircle,
      class: "bg-red-100 text-red-800",
      label: "Rejected",
    },
  };
  const { icon: Icon, class: bgClass, label } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgClass}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

const RoleBadge = ({ role }: { role: User["role"] }) => {
  const config = {
    pending: { class: "bg-gray-100 text-gray-800", label: "Pending" },
    active: { class: "bg-blue-100 text-blue-800", label: "Active" },
    admin: { class: "bg-purple-100 text-purple-800", label: "Admin" },
  };
  const { class: bgClass, label } = config[role];
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgClass}`}
    >
      {label}
    </span>
  );
};

export function UserTableClient({ initialUsers }: UserTableClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpdate = async (
    kindeId: string,
    role: User["role"],
    status: User["status"],
  ) => {
    setLoadingUserId(kindeId);
    const result = await updateUserRoleAndStatus(kindeId, role, status);
    if (result.success && result.user) {
      setUsers((prev) =>
        prev.map((u) => (u.kindeId === kindeId ? result.user : u)),
      );
      showMessage("success", "User updated successfully");
    } else {
      showMessage("error", result.error || "Update failed");
    }
    setLoadingUserId(null);
  };

  const handleDelete = async (kindeId: string, fullName: string) => {
    if (!confirm(`Delete ${fullName}? This action cannot be undone.`)) return;
    setLoadingUserId(kindeId);
    const result = await deleteUser(kindeId);
    if (result.success) {
      setUsers((prev) => prev.filter((u) => u.kindeId !== kindeId));
      showMessage("success", "User deleted successfully");
    } else {
      showMessage("error", result.error || "Delete failed");
    }
    setLoadingUserId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Toast Message */}
      {message && (
        <div
          className={`p-4 ${message.type === "success" ? "bg-green-50 border-b border-green-200" : "bg-red-50 border-b border-red-200"}`}
        >
          <p
            className={`text-sm ${message.type === "success" ? "text-green-800" : "text-red-800"}`}
          >
            {message.text}
          </p>
        </div>
      )}

      {/* Table - responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.kindeId}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {user.fullName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <select
                        value={`${user.role}|${user.status}`}
                        onChange={(e) => {
                          const [newRole, newStatus] =
                            e.target.value.split("|");
                          handleUpdate(
                            user.kindeId,
                            newRole as User["role"],
                            newStatus as User["status"],
                          );
                        }}
                        disabled={loadingUserId === user.kindeId}
                        className="text-sm border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="pending|pending">
                          Pending (Role) / Pending (Status)
                        </option>
                        <option value="active|approved">
                          Active / Approved
                        </option>
                        <option value="admin|approved">Admin / Approved</option>
                        <option value="pending|rejected">
                          Pending / Rejected
                        </option>
                      </select>
                      <button
                        onClick={() =>
                          handleDelete(user.kindeId, user.fullName)
                        }
                        disabled={loadingUserId === user.kindeId}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        title="Delete user"
                      >
                        {loadingUserId === user.kindeId ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
