import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workout.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

export default app;