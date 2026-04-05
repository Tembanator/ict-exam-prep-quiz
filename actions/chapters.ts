"use server";

import mongodb from "@/lib/mongodb";
import { IQuestion, Question } from "@/models/Question";

export interface Chapter {
  chapter: number;
  chapter_name: string;
  theoryCount?: number;
  practicalCount?: number;
  totalQuestions?: number;
}

export async function getAllChapters(): Promise<Chapter[]> {
  await mongodb();

  // Get distinct chapters with their names and counts
  const chapters = await Question.aggregate([
    {
      $group: {
        _id: {
          chapter: "$chapter",
          chapter_name: "$chapter_name",
        },
        theoryCount: {
          $sum: { $cond: [{ $eq: ["$type", "theory"] }, 1, 0] },
        },
        practicalCount: {
          $sum: { $cond: [{ $eq: ["$type", "practical"] }, 1, 0] },
        },
        totalQuestions: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        chapter: "$_id.chapter",
        chapter_name: "$_id.chapter_name",
        theoryCount: 1,
        practicalCount: 1,
        totalQuestions: 1,
      },
    },
    {
      $sort: { chapter: 1 },
    },
  ]);

  return chapters;
}

export async function getQuestionsByChapter(
  chapter: number,
): Promise<IQuestion[]> {
  await mongodb();
  const questions = await Question.find({ chapter }).lean();
  return JSON.parse(JSON.stringify(questions));
}
