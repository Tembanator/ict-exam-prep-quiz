import { useEffect, useState } from "react";
import { getUserByKindeId, getUserByEmail } from "@/actions/users";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface DBUser {
  _id: string;
  kindeId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: "pending" | "active" | "admin";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  quizStats?: {
    totalQuizzesTaken: number;
    averageScore: number;
    chaptersCompleted: number[];
  };
}

interface UseUserFromDBOptions {
  kindeId?: string;
  email?: string;
  autoFetch?: boolean; // if true, fetches based on current authenticated user
}

export function useUserFromDB(options: UseUserFromDBOptions = {}) {
  const { kindeId, email, autoFetch = true } = options;
  const { getUser, isAuthenticated } = useKindeBrowserClient();
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (identifier: string, type: "kindeId" | "email") => {
    setLoading(true);
    setError(null);
    try {
      let result = null;
      if (type === "kindeId") {
        result = await getUserByKindeId(identifier);
      } else {
        result = await getUserByEmail(identifier);
      }
      setUser(result);
      if (!result) setError("User not found");
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && isAuthenticated) {
      const kindeUser = getUser();
      if (kindeUser?.id) {
        fetchUser(kindeUser.id, "kindeId");
      } else if (kindeUser?.email && !kindeUser.id) {
        fetchUser(kindeUser.email, "email");
      } else {
        setLoading(false);
      }
    } else if (kindeId) {
      fetchUser(kindeId, "kindeId");
    } else if (email) {
      fetchUser(email, "email");
    } else {
      setLoading(false);
    }
  }, [kindeId, email, autoFetch, isAuthenticated, getUser]);

  return {
    user,
    loading,
    error,
    refetch: () => {
      if (kindeId) fetchUser(kindeId, "kindeId");
      else if (email) fetchUser(email, "email");
      else if (autoFetch && isAuthenticated) {
        const kindeUser = getUser();
        if (kindeUser?.id) fetchUser(kindeUser.id, "kindeId");
      }
    },
  };
}
