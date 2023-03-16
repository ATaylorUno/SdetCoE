const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getExercises(req, res) {
  const exercises = await prisma.exercises.findMany();

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

  res.status(200).json(exercises);
}

module.exports = {
  getExercises,
  postExercises,
  putExercises,
  getExercisesBodyId
};
