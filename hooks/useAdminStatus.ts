import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { checkUserStatus } from "@/actions/users";

export function useAdminStatus() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      if (!isAuthenticated || !user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const status = await checkUserStatus(user.id);
      setIsAdmin(status.isAdmin || false);
      setLoading(false);
    }
    check();
  }, [isAuthenticated, user]); // user object is stable

  return { isAdmin, loading };
}
