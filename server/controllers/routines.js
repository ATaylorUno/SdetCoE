const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getRoutines(req, res) {
  const { weeks, frequency } = req.query;
  const { user } = res.locals;
  const config = {
    where: {
      user_id: parseInt(user)
    }
  };
  if (weeks) {
    config.where.weeks = parseInt(weeks);
  }

  if (frequency) {
    config.where.frequency = parseInt(frequency);
  }
  const routines = await prisma.routines.findMany(config);

  if (routines) {
    res.status(200).json(routines);
  } else {
    res.sendStatus(404);
  }
}

async function getRoutinesByUserID(req, res) {
  const routines = await prisma.routines.findMany({
    where: {
      user_id: parseInt(req.params.user_id)
    }
  });

  if (routines) {
    res.status(200).json(routines);
  } else {
    res.sendStatus(404);
  }
}

async function getRoutineWorkout(req, res) {
  const routines = await prisma.workouts.findUnique({
    where: {
      id: parseInt(req.params.routine_id)
    }
  });

  if (routines) {
    res.status(200).json(routines);
  } else {
    res.sendStatus(404);
  }
}

async function getExerciseRoutine(req, res) {
  const routines = await prisma.routine_exercises.findUnique({
    where: {
      id: parseInt(req.params.routine_id)
    }
  });

  if (routines) {
    res.status(200).json(routines);
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  getRoutines,
  getRoutinesByUserID,
  getRoutineWorkout,
  getExerciseRoutine
};
