"use server";

import mongodb from "@/lib/mongodb";
import { User } from "@/models/User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateUserData {
  kindeId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function createOrSyncUser(userData: CreateUserData) {
  try {
    await mongodb();

    // const { kindeId, email, firstName, lastName } = userData;
    // const fullName = `${firstName} ${lastName}`;

    // // Check if user already exists
    // const existingUser = await User.findOne({ $or: [{ kindeId }, { email }] });

    // if (existingUser) {
    //   // Update existing user with latest info
    //   existingUser.firstName = firstName;
    //   existingUser.lastName = lastName;
    //   existingUser.fullName = fullName;
    //   existingUser.lastLogin = new Date();
    //   existingUser.email = email;

    //   await existingUser.save();

    //   return {
    //     success: true,
    //     user: existingUser,
    //     isNew: false,
    //     message: "User synced successfully",
    //   };
    // }

    // // Create new user with pending status
    // const newUser = await User.create({
    //   kindeId,
    //   email,
    //   firstName,
    //   lastName,
    //   fullName,
    //   role: "pending",
    //   status: "pending",
    //   lastLogin: new Date(),
    //   quizStats: {
    //     totalQuizzesTaken: 0,
    //     averageScore: 0,
    //     chaptersCompleted: [],
    //   },
    // });

    // return {
    //   success: true,
    //   user: newUser,
    //   isNew: true,
    //   message: "User created successfully. Awaiting admin approval.",
    // };
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

export async function checkUserStatus(kindeId: string) {
  try {
    await mongodb();
    const user = await User.findOne({ kindeId });

    if (!user) {
      return { status: "not_found", role: null };
    }

    return {
      status: user.status,
      role: user.role,
      canAccessQuiz: user.status === "approved" && user.role === "active",
    };
  } catch (error) {
    console.error("Error checking user status:", error);
    return { status: "error", role: null, canAccessQuiz: false };
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

    revalidatePath("/admin/users");
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
