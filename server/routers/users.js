const { Router } = require("express");
const router = Router();
const validationUtils = require("../utils/validation");
const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of users with the user ID, name & password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "user_id": 1, "first_name": "Andrew", "last_name": "Taylor", "password": "pa$$word" }, { "user_id": 2, "first_name": "Andy", "last_name": "Tyler", "password": "passw0rd" }]'
 *       204:
 *         description: No content
 */
router.route("/").get(async (req, res) => {
  const users = await prisma.users.findMany();

  return res.status(200).json(users);
});
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: string
 *                required: true
 *                descriptions: The users first name
 *              last_name:
 *                type: string
 *                required: true
 *                descriptions: The users last name
 *              password:
 *                type: string
 *                required: true
 *                descriptions: The users password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "first_name": "new_f_name", "last_name": "new_l_name","password": "new_password"}]'
 *       204:
 *         description: No content
 */
router
  .route("/")
  .post(
    [
      body("first_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the first_name must have minimum length of 3")
        .trim(),
      body("last_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the last_name must have minimum length of 3")
        .trim(),
      body("password").isString().withMessage("password is required.").trim()
    ],
    validationUtils.validate,
    async (req, res) => {
      const { first_name, last_name, password } = req.body;
      const users = await prisma.users.create({
        data: {
          first_name,
          last_name,
          password
        }
      });
      res.status(200).json(users);
    }
  );
/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Update a user by user ID
 *     parameters:
 *      - name: user_id
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: string
 *                required: true
 *                descriptions: The users first name
 *              second_name:
 *                type: string
 *                required: true
 *                descriptions: The users second name
 *              password:
 *                type: string
 *                required: true
 *                descriptions: The users password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "first_name": "new_f_name", "last_name": "new_l_name","password": "new_password"}]'
 *       204:
 *         description: No content
 */
router
  .route("/:user_id(\\d+)")
  .put(
    [
      body("first_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the first_name must have minimum length of 3")
        .trim(),
      body("last_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the last_name must have minimum length of 3")
        .trim(),
      body("password").isString().withMessage("password is required.").trim()
    ],
    validationUtils.validate,
    (req, res) => res.send("Create a new user")
  );
/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a user by user ID
 *     parameters:
 *      - name: user_id
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "user_id": 1, "first_name": "Andrew", "last_name": "Taylor", "password": "pa$$word" }, { "user_id": 2, "first_name": "Andy", "last_name": "Tyler", "password": "passw0rd" }]'
 *       204:
 *         description: No content
 */
router.route("/:user_id(\\d+)").get(async (req, res) => {
  const users = await prisma.users.findMany({
    where: {
      user_id: parseInt(req.params.user_id)
    }
  });

  res.status(200).json(users);
});

module.exports = router;
