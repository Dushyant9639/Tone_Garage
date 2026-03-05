"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWorkouts = void 0;
const workout_model_1 = __importDefault(require("../models/workout.model"));
const getAllWorkouts = async (req, res) => {
    const workouts = await workout_model_1.default.find();
    res.json(workouts);
};
exports.getAllWorkouts = getAllWorkouts;
