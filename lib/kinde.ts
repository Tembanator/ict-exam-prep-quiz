import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const { getUser } = getKindeServerSession();

export async function requireAuth() {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/api/auth/login");
  }
}

export async function requireActiveUser() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/api/auth/login");
  }

  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  // This will be checked against MongoDB
  return user;
}
