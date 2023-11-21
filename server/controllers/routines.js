const prisma = require("../utils/prisma");

async function getRoutines(req, res) {
  const { frequency } = req.query;
  const { user } = res.locals;
  const config = {
    where: {
      user_id: parseInt(user)
    }
  };

  if (frequency) {
    config.where.frequency = parseInt(frequency);
  }
  const routines = await prisma.routines.findMany(config);

  if (routines && routines.length > 0) {
    return res.status(200).json(routines);
  }
  return res.sendStatus(204);
}

async function getRoutinesByUserID(req, res) {
  const routines = await prisma.routines.findUnique({
    where: {
      id: parseInt(req.params.user_id)
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

async function createRoutines(req, res) {
  const { name, start_date, finish_date, frequency, user_id } = req.body;
  const routine = await prisma.routines.create({
    data: {
      name,
      start_date: new Date(start_date),
      finish_date: new Date(finish_date),
      frequency: parseInt(frequency),
      user_id: parseInt(user_id)
    }
  });
  res.status(200).json(routine);
}

module.exports = {
  getRoutines,
  getRoutinesByUserID,
  getRoutineWorkout,
  getExerciseRoutine,
  createRoutines
};
