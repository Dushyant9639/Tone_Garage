import UserWorkout from "../models/userWorkout.model";
import dayjs from "dayjs";

export const calculateStreak = async (userId: string) => {
  const workouts = await UserWorkout.find({ user: userId })
    .sort({ completedAt: -1 });

  if (!workouts.length) return { streak: 0 };

  let streak = 0;
  let today = dayjs().startOf("day");

  for (const workout of workouts) {
    const workoutDate = dayjs(workout.completedAt).startOf("day");

    if (workoutDate.isSame(today)) {
      streak++;
      today = today.subtract(1, "day");
    } else if (workoutDate.isBefore(today)) {
      break;
    }
  }

  return {
    streak,
    lastWorkoutDate: workouts[0].completedAt,
  };
};