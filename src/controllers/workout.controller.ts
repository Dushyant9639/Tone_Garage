import { Request, Response } from "express";
import Workout from "../models/workout.model";

export const getAllWorkouts = async (req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
};