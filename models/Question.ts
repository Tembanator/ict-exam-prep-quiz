import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  id: string;
  chapter: number;
  chapter_name: string;
  topic: string;
  type: "theory" | "practical";
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

const QuestionSchema = new Schema<IQuestion>({
  id: { type: String, required: true, unique: true },
  chapter: { type: Number, required: true },
  chapter_name: { type: String, required: true },
  topic: { type: String, required: true },
  type: { type: String, enum: ["theory", "practical"], required: true },
  question_text: { type: String, required: true },
  options: { type: [String], required: true },
  correct_answer: { type: String, required: true },
  explanation: { type: String, required: true },
});

export const Question =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);
