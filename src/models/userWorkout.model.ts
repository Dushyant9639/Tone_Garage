import mongoose, { Schema, Document } from "mongoose";

export interface IUserWorkout extends Document {
  user: mongoose.Types.ObjectId;
  workout: mongoose.Types.ObjectId;
  completedAt: Date;
}

const userWorkoutSchema = new Schema<IUserWorkout>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    workout: {
      type: Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },
    completedAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

userWorkoutSchema.index({ user: 1, completedAt: -1 });

export default mongoose.model<IUserWorkout>(
  "UserWorkout",
  userWorkoutSchema
);