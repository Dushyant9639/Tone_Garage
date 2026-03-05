# Workout Tracker Backend API

A RESTful backend API for the **Workout Tracker Application** built with **Node.js, Express, TypeScript, and MongoDB**.
This API allows users to view workouts, mark workouts as completed, track workout history, and calculate workout streaks.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB**
* **Mongoose**
* **REST API Architecture**

---

## 📁 Project Structure

```
src/
│
├── controllers/
│   ├── workout.controller.ts
│   └── user.controller.ts
│
├── models/
│   ├── user.model.ts
│   ├── workout.model.ts
│   └── userWorkout.model.ts
│
├── routes/
│   ├── workout.routes.ts
│   └── user.routes.ts
│
├── services/
│   └── streak.service.ts
│
├── config/
│   └── db.ts
│
└── server.ts
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/Dushyant9639/Tone_Garage.git
```

Navigate into the project:

```
cd Tone_Garage
```

Install dependencies:

```
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/workout-tracker
```

---

## ▶️ Run the Server

Development mode:

```
npm run dev
```

Build the project:

```
npm run build
```

Run production build:

```
npm start
```

Server will start at:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### 1️⃣ Get All Workouts

```
GET /api/workouts
```

Response:

```
[
  {
    "_id": "workoutId",
    "title": "Push Ups",
    "durationMinutes": 15,
    "difficulty": "Beginner"
  }
]
```

---

### 2️⃣ Get User Workout History

```
GET /api/users/:userId/workout-history
```

Returns a paginated list of workouts completed by the user.

---

### 3️⃣ Complete a Workout

```
POST /api/users/:userId/workouts/:workoutId/complete
```

Request Body:

```
{
  "completedAt": "2026-01-21T10:30:00Z"
}
```

Response:

```
{
  "message": "Workout completed successfully",
  "streak": 3
}
```

---

### 4️⃣ Get User Workout Streak

```
GET /api/users/:userId/streak
```

Response:

```
{
  "streak": 5,
  "lastWorkoutDate": "2026-01-21"
}
```

---

## 🗄️ Database Schema

### Users Collection

```
{
  name: String,
  email: String,
  createdAt: Date
}
```

---

### Workouts Collection

```
{
  title: String,
  description: String,
  durationMinutes: Number,
  difficulty: "Beginner | Intermediate | Advanced"
}
```

---

### User Workouts Collection

```
{
  user: ObjectId,
  workout: ObjectId,
  completedAt: Date
}
```

---

## 🔥 Streak Calculation Logic

1. Fetch all completed workouts for a user.
2. Sort them by date (descending).
3. Start counting from today backwards.
4. If a day is skipped, the streak stops.

Example:

```
Jan 21 → Workout completed
Jan 20 → Workout completed
Jan 19 → Workout completed
Jan 18 → Missed
```

Streak = **3 days**

---

## 🧪 Testing APIs

You can test all endpoints using:

* **Postman**
* **Thunder Client**
* **cURL**

Example:

```
GET http://localhost:5000/api/workouts
```

---

## 📌 Features

✔ View available workouts
✔ Mark workout as completed
✔ Track workout history
✔ Calculate workout streak
✔ Pagination support
✔ RESTful API design

---

## 📈 Future Improvements

* JWT Authentication
* User login/signup
* API rate limiting
* Swagger API documentation
* Unit tests with Jest

---

## 👨‍💻 Author

**Dushyant**

GitHub:
https://github.com/Dushyant9639

---
