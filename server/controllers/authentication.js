const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

//Authenticate
async function authenticate(req, res) {
  const { email, password } = req.body;
  const users = await prisma.users.findMany({
    where: {
      email: email
    }
  });
  const userFound = users && users.length > 0 && users[0];
  if (userFound) {
    const passwordCorrect = await bcrypt.compare(password, userFound.password);
    if (passwordCorrect) {
      const accessToken = jwt.sign({ sub: userFound.id }, "MySecretValue", {
        expiresIn: 1200
      });
      return res.status(200).json({ accessToken });
    }
  }
  return res.sendStatus(401);
}

module.exports = {
  authenticate
};
