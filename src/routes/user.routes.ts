import express from "express";
import {
  getWorkoutHistory,
  completeWorkout,
  getUserStreak,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/:userId/workout-history", getWorkoutHistory);
router.post("/:userId/workouts/:workoutId/complete", completeWorkout);
router.get("/:userId/streak", getUserStreak);

export default router;