import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model";
import Workout from "../models/workout.model";
import UserWorkout from "../models/userWorkout.model";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  await User.deleteMany({});
  await Workout.deleteMany({});
  await UserWorkout.deleteMany({});

  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
  });

  const workouts = await Workout.insertMany([
    { title: "Push Ups", durationMinutes: 15, difficulty: "Beginner" },
    { title: "Running", durationMinutes: 30, difficulty: "Intermediate" },
    { title: "Squats", durationMinutes: 20, difficulty: "Beginner" },
    { title: "Plank", durationMinutes: 10, difficulty: "Beginner" },
    { title: "HIIT", durationMinutes: 25, difficulty: "Advanced" },
  ]);

  await UserWorkout.create({
    user: user._id,
    workout: workouts[0]._id,
    completedAt: new Date(),
  });

  console.log("Seeded Successfully");
  process.exit();
};

seed();