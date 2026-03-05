import { Request, Response } from "express";
import UserWorkout from "../models/userWorkout.model";
import Workout from "../models/workout.model";
import { calculateStreak } from "../services/streak.service";

// Get User Workout History
export const getWorkoutHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = 5;

    const history = await UserWorkout.find({ user: userId })
      .populate("workout")
      .sort({ completedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workout history",
      error,
    });
  }
};

// Complete Workout
export const completeWorkout = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const workoutId = req.params.workoutId as string;
    const { completedAt } = req.body;

    if (!completedAt) {
      return res.status(400).json({
        message: "completedAt is required",
      });
    }

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    await UserWorkout.create({
      user: userId,
      workout: workoutId,
      completedAt: new Date(completedAt),
    });

    const streak = await calculateStreak(userId);

    res.status(201).json({
      message: "Workout completed successfully",
      streak,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to complete workout",
      error,
    });
  }
};

// Get User Streak
export const getUserStreak = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;

    const streak = await calculateStreak(userId);

    res.status(200).json(streak);
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate streak",
      error,
    });
  }
};
