const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getExercises(req, res) {
  const { body_part_id } = req.query;
  const config = { where: {} };
  if (body_part_id) {
    config.where.body_part_id = parseInt(body_part_id);
  }
  const exercises = await prisma.exercises.findMany(config);

  return res.status(200).json(exercises);
}

async function postExercises(req, res) {
  const { exercise_name, compound, body_part_id } = req.body;
  const exercises = await prisma.exercises.create({
    data: {
      exercise_name,
      compound: Boolean(compound),
      body_part_id: parseInt(body_part_id)
    }
  });
  res.status(200).json(exercises);
}

async function putExercises(req, res) {
  const { exercise_name, compound, body_part_id } = req.body;
  const exercises = await prisma.exercises.update({
    where: {
      id: parseInt(req.params.exercise_id)
    },
    data: {
      exercise_name,
      compound: Boolean(compound),
      body_part_id: parseInt(body_part_id)
    }
  });
  res.status(200).json(exercises);
}

async function getExercisesBodyId(req, res) {
  const exercises = await prisma.exercises.findMany({
    where: {
      body_part_id: parseInt(req.params.body_part_id)
    }
  });
  if (exercises) {
    res.status(200).json(exercises);
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  getExercises,
  postExercises,
  putExercises,
  getExercisesBodyId
};
