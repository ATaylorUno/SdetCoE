const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");

async function getUser(req, res) {
  const { first_name, second_name } = req.query;
  const config = {
    where: {},
    select: {
      id: true,
      first_name: true,
      second_name: true
    }
  };
  if (first_name) {
    config.where.first_name = {
      startsWith: first_name,
      mode: "insensitive"
    };
  }
  if (second_name) {
    config.where.second_name = {
      startsWith: second_name,
      mode: "insensitive"
    };
  }
  const users = await prisma.users.findMany(config);

  if (users && users.length > 0) {
    return res.status(200).json(users);
  }
  return res.sendStatus(204);
}

async function createUser(req, res) {
  const { first_name, second_name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const users = await prisma.users.create({
    data: {
      first_name,
      second_name,
      password: hashedPassword
    }
  });
  res.status(201).json(users);
}

async function updateUser(req, res) {
  const { user_id } = req.params;

  const { first_name, second_name, password } = req.body; //check variables are being used correctly
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //password doesnt need to be hashed in unit tests, just that bcrypt is being called
    await prisma.users.update({
      //not using prisma, just checking it is being called
      where: {
        id: parseInt(req.params.user_id)
      },
      data: {
        first_name,
        second_name,
        password: hashedPassword
      }
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.sendStatus(404);
    }
  }
  return res.sendStatus(204);
}

async function getUserById(req, res) {
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(req.params.user_id)
    }
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  getUserById
};
