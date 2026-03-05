import express from "express";
import { getAllWorkouts } from "../controllers/workout.controller";

const router = express.Router();
router.get("/", getAllWorkouts);

export default router;