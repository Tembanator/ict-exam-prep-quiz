import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  kindeId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: "pending" | "active" | "admin";
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  // quizStats?: {
  //   totalQuizzesTaken: number;
  //   averageScore: number;
  //   chaptersCompleted: number[];
  // };
}

const UserSchema = new Schema<IUser>(
  {
    kindeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["pending", "active", "admin"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    // quizStats: {
    //   totalQuizzesTaken: { type: Number, default: 0 },
    //   averageScore: { type: Number, default: 0 },
    //   chaptersCompleted: [{ type: Number }],
    // },
  },
  {
    timestamps: true,
  },
);

// Create compound index for faster queries
UserSchema.index({ email: 1, kindeId: 1 });

// Virtual for full name
UserSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtuals are included in JSON output
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
