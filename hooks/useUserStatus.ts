// import { useEffect, useState, useCallback } from "react";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { getCurrentUserStatus } from "@/actions/users";

// export interface UserStatus {
//   status:
//     | "pending"
//     | "approved"
//     | "rejected"
//     | "unauthenticated"
//     | "not_found"
//     | "error";
//   role: "pending" | "active" | "admin" | null;
//   canAccessQuiz: boolean;
// }

// export function useUserStatus() {
//   const { isAuthenticated } = useKindeBrowserClient();
//   const [userStatus, setUserStatus] = useState<UserStatus>({
//     status: "unauthenticated",
//     role: null,
//     canAccessQuiz: false,
//   });
//   const [loading, setLoading] = useState(true);

//   const fetchStatus = useCallback(async () => {
//     if (!isAuthenticated) {
//       setUserStatus({
//         status: "unauthenticated",
//         role: null,
//         canAccessQuiz: false,
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const status = await getCurrentUserStatus();
//       setUserStatus(status);
//     } catch (error) {
//       console.error("Failed to fetch user status:", error);
//       setUserStatus({
//         status: "error",
//         role: null,
//         canAccessQuiz: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     fetchStatus();
//     // Optional: auto-refresh every 30 seconds
//     const interval = setInterval(() => {
//       if (isAuthenticated) fetchStatus();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [fetchStatus, isAuthenticated]);

//   const refetch = useCallback(async () => {
//     setLoading(true);
//     await fetchStatus();
//   }, [fetchStatus]);

//   return { userStatus, loading, refetch };
// }
