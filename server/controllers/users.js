const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUser(req, res) {
  const users = await prisma.users.findMany();

  return res.status(200).json(users);
}

async function createUser(req, res) {
  const { first_name, second_name, password } = req.body;
  const users = await prisma.users.create({
    data: {
      first_name,
      second_name,
      password
    }
  });
  res.status(200).json(users);
}

async function updateUser(req, res) {
  const { first_name, second_name, password } = req.body;
  const user = await prisma.users.update({
    where: {
      id: parseInt(req.params.user_id)
    },
    data: {
      first_name,
      second_name,
      password
    }
  });
  res.status(200).json(user);
}

async function getUserById(req, res) {
  const users = await prisma.users.findMany({
    where: {
      id: parseInt(req.params.user_id)
    }
  });

  res.status(200).json(users);
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  getUserById
};
