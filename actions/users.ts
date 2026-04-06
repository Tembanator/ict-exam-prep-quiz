"use server";

import mongodb from "@/lib/mongodb";
import { User } from "@/models/User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendStatusChangeEmail } from "./emails";

interface CreateUserData {
  kindeId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function getUserByEmail(email: string) {
  await mongodb();
  const user = await User.findOne({ email }).lean();
  return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function createOrSyncUser(userData: CreateUserData) {
  try {
    await mongodb();

    const { kindeId, email, firstName, lastName } = userData;
    const fullName = `${firstName} ${lastName}`;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ kindeId }, { email }] });

    if (existingUser) {
      // Update existing user with latest info
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.fullName = fullName;
      existingUser.lastLogin = new Date();
      existingUser.email = email;

      await existingUser.save();

      return {
        success: true,
        user: existingUser,
        isNew: false,
        message: "User synced successfully",
      };
    }

    // Create new user with pending status
    const newUser = await User.create({
      kindeId,
      email,
      firstName,
      lastName,
      fullName,
      role: "pending",
      status: "pending",
      lastLogin: new Date(),
      // quizStats: {
      //   totalQuizzesTaken: 0,
      //   averageScore: 0,
      //   chaptersCompleted: [],
      // },
    });

    return {
      success: true,
      user: newUser,
      isNew: true,
      message: "User created successfully. Awaiting admin approval.",
    };
  } catch (error) {
    console.error("Error creating/syncing user:", error);
    return {
      success: false,
      error: "Failed to create or sync user",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getUserByKindeId(kindeId: string) {
  try {
    await mongodb();
    const user = await User.findOne({ kindeId });
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Inside src/actions/user.ts - modify checkUserStatus
export async function checkUserStatus(kindeId: string) {
  try {
    await mongodb();
    const user = await User.findOne({ kindeId });

    if (!user) {
      return {
        status: "not_found",
        role: null,
        canAccessQuiz: false,
        isAdmin: false,
      };
    }

    return {
      status: user.status,
      role: user.role,
      canAccessQuiz: user.status === "approved" && user.role === "active",
      isAdmin: user.status === "approved" && user.role === "admin", // <-- added
    };
  } catch (error) {
    console.error("Error checking user status:", error);
    return {
      status: "error",
      role: null,
      canAccessQuiz: false,
      isAdmin: false,
    };
  }
}

export async function updateUserRole(
  kindeId: string,
  role: "pending" | "active" | "admin",
) {
  try {
    await mongodb();
    const user = await User.findOneAndUpdate(
      { kindeId },
      {
        role,
        status: role === "pending" ? "pending" : "approved",
      },
      { new: true },
    );

    revalidatePath("/admin");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role" };
  }
}

export async function getAllPendingUsers() {
  try {
    await mongodb();
    const users = await User.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return [];
  }
}

export async function getAllActiveUsers() {
  try {
    await mongodb();
    const users = await User.find({ status: "approved", role: "active" }).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching active users:", error);
    return [];
  }
}

// Add to existing imports

// Add these functions:

export async function getAllUsers() {
  try {
    await mongodb();
    const users = await User.find({}).sort({ createdAt: -1 }).select("-__v"); // exclude version field
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}

export async function updateUserRoleAndStatus(
  kindeId: string,
  role: "pending" | "active" | "admin",
  status: "pending" | "approved" | "rejected",
) {
  try {
    await mongodb();

    const user = await User.findOneAndUpdate(
      { kindeId },
      { role, status },
      { new: true, runValidators: true },
    );

    if (!user) {
      return { success: false, error: "User not found" };
    }

    await sendStatusChangeEmail(user.firstName, user.email, status);
    revalidatePath("/admin");
    return { success: true, user: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(kindeId: string) {
  try {
    await mongodb();
    const result = await User.findOneAndDelete({ kindeId });

    if (!result) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

// Add to src/actions/user.ts
export async function getCurrentUserStatus() {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser?.id) {
      return { status: "unauthenticated", role: null, canAccessQuiz: false };
    }

    await mongodb();
    const user = await User.findOne({ kindeId: kindeUser.id }).lean();

    if (!user) {
      return { status: "not_found", role: null, canAccessQuiz: false };
    }

    return {
      status: user.status,
      role: user.role,
      canAccessQuiz: user.status === "approved" && user.role === "active",
    };
  } catch (error) {
    console.error("Error getting current user status:", error);
    return { status: "error", role: null, canAccessQuiz: false };
  }
}
