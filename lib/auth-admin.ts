import { redirect } from "next/navigation";
import { getUser } from "./kinde";
import { getUserByKindeId } from "@/actions/users";
// import { checkUserStatus } from "@/actions/user";

export async function requireAdminUser() {
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login"); // Redirect to login if not authenticated
  }

  const dbUser = await getUserByKindeId(user.id);
  if (!dbUser || dbUser.role !== "admin" || dbUser.status !== "approved") {
    redirect("/"); // Redirect to home if not admin or not approved
  }
}
export async function requireApproved() {
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login"); // Redirect to login if not authenticated
  }

  const dbUser = await getUserByKindeId(user.id);
  if (!dbUser || dbUser.status !== "approved") {
    redirect("/pending-approval"); // Redirect to home if not admin or not approved
  }
}
