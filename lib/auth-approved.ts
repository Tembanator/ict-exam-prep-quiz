import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { checkUserStatus } from "@/actions/users";

export async function requireApprovedUser() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/api/auth/login");

  const kindeUser = await getUser();
  if (!kindeUser) redirect("/api/auth/login");

  const userStatus = await checkUserStatus(kindeUser.id);
  if (!userStatus.canAccessQuiz && !userStatus.isAdmin) {
    redirect("/pending-approval");
  }

  return kindeUser;
}
