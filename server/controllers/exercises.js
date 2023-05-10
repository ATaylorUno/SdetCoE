const prisma = require("../utils/prisma");

async function getExercises(req, res) {
  const { body_part_id } = req.query;
  const config = { where: {} };
  if (body_part_id) {
    config.where.body_part_id = parseInt(body_part_id);
  }
  const exercises = await prisma.exercises.findMany(config);

  if (exercises && exercises.length > 0) {
    return res.status(200).json(exercises);
  }
  return res.sendStatus(204);
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
  const { exercise_id } = req.params;

  const { exercise_name, compound, body_part_id } = req.body;
  try {
    await prisma.exercises.update({
      where: {
        id: parseInt(exercise_id)
      },
      data: {
        exercise_name,
        compound: Boolean(compound),
        body_part_id: parseInt(body_part_id)
      }
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.sendStatus(404);
    }
  }
  return res.sendStatus(204);
}

async function getExercisesBodyId(req, res) {
  const exercises = await prisma.exercises.findMany({
    where: {
      body_part_id: parseInt(req.params.body_part_id)
    }
  });
  if (exercises && exercises.length > 0) {
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
