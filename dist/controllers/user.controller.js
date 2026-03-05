"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStreak = exports.completeWorkout = exports.getWorkoutHistory = void 0;
const userWorkout_model_1 = __importDefault(require("../models/userWorkout.model"));
const workout_model_1 = __importDefault(require("../models/workout.model"));
const streak_service_1 = require("../services/streak.service");
// Get User Workout History
const getWorkoutHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const history = await userWorkout_model_1.default.find({ user: userId })
            .populate("workout")
            .sort({ completedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(history);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch workout history",
            error,
        });
    }
};
exports.getWorkoutHistory = getWorkoutHistory;
// Complete Workout
const completeWorkout = async (req, res) => {
    try {
        const userId = req.params.userId;
        const workoutId = req.params.workoutId;
        const { completedAt } = req.body;
        if (!completedAt) {
            return res.status(400).json({
                message: "completedAt is required",
            });
        }
        const workout = await workout_model_1.default.findById(workoutId);
        if (!workout) {
            return res.status(404).json({
                message: "Workout not found",
            });
        }
        await userWorkout_model_1.default.create({
            user: userId,
            workout: workoutId,
            completedAt: new Date(completedAt),
        });
        const streak = await (0, streak_service_1.calculateStreak)(userId);
        res.status(201).json({
            message: "Workout completed successfully",
            streak,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to complete workout",
            error,
        });
    }
};
exports.completeWorkout = completeWorkout;
// Get User Streak
const getUserStreak = async (req, res) => {
    try {
        const userId = req.params.userId;
        const streak = await (0, streak_service_1.calculateStreak)(userId);
        res.status(200).json(streak);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to calculate streak",
            error,
        });
    }
};
exports.getUserStreak = getUserStreak;
