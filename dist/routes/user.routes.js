"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.get("/:userId/workout-history", user_controller_1.getWorkoutHistory);
router.post("/:userId/workouts/:workoutId/complete", user_controller_1.completeWorkout);
router.get("/:userId/streak", user_controller_1.getUserStreak);
exports.default = router;
