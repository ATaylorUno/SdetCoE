const prisma = require("../utils/prisma");

async function getWorkouts(req, res) {
  const { user } = res.locals;
  const workouts = await prisma.workouts.findMany({
    where: {
      routines: {
        user_id: parseInt(user)
      }
    }
  });
  if (workouts && workouts.length > 0) {
    return res.status(200).json(workouts);
  }
  return res.sendStatus(204);
}

async function getExercisesByWorkoutId(req, res) {
  const workouts = await prisma.workouts.findUnique({
    where: {
      id: parseInt(req.params.workout_id)
    },
    select: {
      workout_exercises: {
        select: {
          exercises: true
        }
      }
    }
  });

  if (workouts && workouts.workout_exercises.length > 0) {
    const exercises = workouts.workout_exercises.map((x) => x.exercises);
    return res.status(200).json(exercises);
  }
  return res.sendStatus(204);
}

module.exports = {
  getWorkouts,
  getExercisesByWorkoutId
};
