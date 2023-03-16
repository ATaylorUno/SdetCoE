const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getRoutines(req, res) {
  const routines = await prisma.routines.findMany();

  return res.status(200).json(routines);
}

async function getRoutinesByUserID(req, res) {
  const routines = await prisma.routines.findMany({
    where: {
      user_id: parseInt(req.params.user_id)
    }
  });

  res.status(200).json(routines);
}

async function getRoutineWorkout(req, res) {
  const routines = await prisma.workouts.findMany({
    where: {
      routine_id: parseInt(req.params.routine_id)
    }
  });

  res.status(200).json(routines);
}

async function getExerciseRoutine(req, res) {
  const routines = await prisma.routine_exercises.findMany({
    where: {
      routine_id: parseInt(req.params.routine_id)
    }
  });

  res.status(200).json(routines);
}

module.exports = {
  getRoutines,
  getRoutinesByUserID,
  getRoutineWorkout,
  getExerciseRoutine
};
