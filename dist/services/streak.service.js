"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStreak = void 0;
const userWorkout_model_1 = __importDefault(require("../models/userWorkout.model"));
const dayjs_1 = __importDefault(require("dayjs"));
const calculateStreak = async (userId) => {
    const workouts = await userWorkout_model_1.default.find({ user: userId })
        .sort({ completedAt: -1 });
    if (!workouts.length)
        return { streak: 0 };
    let streak = 0;
    let today = (0, dayjs_1.default)().startOf("day");
    for (const workout of workouts) {
        const workoutDate = (0, dayjs_1.default)(workout.completedAt).startOf("day");
        if (workoutDate.isSame(today)) {
            streak++;
            today = today.subtract(1, "day");
        }
        else if (workoutDate.isBefore(today)) {
            break;
        }
    }
    return {
        streak,
        lastWorkoutDate: workouts[0].completedAt,
    };
};
exports.calculateStreak = calculateStreak;
