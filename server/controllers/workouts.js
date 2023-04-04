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
  const workouts = await prisma.workouts.findMany({
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

  const exercises = workouts
    .flatMap((x) => x.workout_exercises)
    .map((x) => x.exercises);

  res.status(200).json(exercises);
}

module.exports = {
  getWorkouts,
  getExercisesByWorkoutId
};
