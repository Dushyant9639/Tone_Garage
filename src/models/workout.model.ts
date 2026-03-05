import mongoose, { Schema, Document } from "mongoose";

export interface IWorkout extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: String,
    durationMinutes: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>("Workout", workoutSchema);