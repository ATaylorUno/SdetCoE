const { Router } = require("express");
const router = Router();
const validationUtils = require("../utils/validation");
const { check } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { authenticationController } = require("../controllers");

/**
 * @swagger
 * /authentication:
 *   post:
 *     tags: [
 *       authentication
 *     ]
 *     summary: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 required: true
 *                 description: The first_name for the user
 *               second_name:
 *                 type: string
 *                 required: true
 *                 description: The second_name for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password of the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: User Authenticated
 */

router
  .route("/")
  .post(
    [
      check("first_name")
        .isLength({ min: 2 })
        .withMessage("the first_name must have minimum length of 2")
        .trim(),
      check("second_name")
        .isLength({ min: 3 })
        .withMessage("the second_name must have minimum length of 2")
        .trim(),
      check("password")
        .isLength({ min: 6, max: 15 })
        .withMessage(
          "your password should have min and max length between 8-15"
        )
    ],
    validationUtils.validate,
    authenticationController.authenticate
  );

module.exports = router;
