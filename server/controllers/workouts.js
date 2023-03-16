async function getWorkouts(req, res) {
  const workouts = await prisma.workouts.findMany();

  return res.status(200).json(workouts);
}

async function getExercisesByWorkoutId(req, res) {
  const workouts = await prisma.workouts.findMany({
    where: {
      workout_id: parseInt(req.params.workout_id)
    }
  });

  res.status(200).json(workouts);
}

module.exports = {
  getWorkouts,
  getExercisesByWorkoutId
};
