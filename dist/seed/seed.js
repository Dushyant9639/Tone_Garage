"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const workout_model_1 = __importDefault(require("../models/workout.model"));
const userWorkout_model_1 = __importDefault(require("../models/userWorkout.model"));
dotenv_1.default.config();
const seed = async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    await user_model_1.default.deleteMany({});
    await workout_model_1.default.deleteMany({});
    await userWorkout_model_1.default.deleteMany({});
    const user = await user_model_1.default.create({
        name: "Test User",
        email: "test@example.com",
    });
    const workouts = await workout_model_1.default.insertMany([
        { title: "Push Ups", durationMinutes: 15, difficulty: "Beginner" },
        { title: "Running", durationMinutes: 30, difficulty: "Intermediate" },
        { title: "Squats", durationMinutes: 20, difficulty: "Beginner" },
        { title: "Plank", durationMinutes: 10, difficulty: "Beginner" },
        { title: "HIIT", durationMinutes: 25, difficulty: "Advanced" },
    ]);
    await userWorkout_model_1.default.create({
        user: user._id,
        workout: workouts[0]._id,
        completedAt: new Date(),
    });
    console.log("Seeded Successfully");
    process.exit();
};
seed();
