const { Router } = require("express");
const router = Router();
const validationUtils = require("../utils/validation");
const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { exercisesController } = require("../controllers/");

/**
 * @swagger
 * /exercises:
 *   get:
 *     tags: [
 *       exercises
 *     ]
 *     summary: Returns an array of exercises with the exercise_id, name, compound and body part ID associated
 *     parameters:
 *      - name: body_part_id
 *        in: query
 *        type: interger
 *        description: The ID of the body part
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"exercise_id": 1,"exercise_name": "Bench Press", "compound": True,"body_part_id": "1"}]'
 *       204:
 *         description: No content
 */

router.route("/").get(exercisesController.getExercises);

/**
 * @swagger
 * /exercises:
 *   post:
 *     tags: [
 *       exercises
 *     ]
 *     summary: Create a new exercise
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              exercise_name:
 *                type: string
 *                required: true
 *                descriptions: The exercise name
 *              compound:
 *                type: boolean
 *                required: true
 *                descriptions: Is it a compound movement
 *              body_part_id:
 *                type: number
 *                required: true
 *                descriptions: The associated body part ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"exercise_name": "new_exercise", "compound": True/false, "body_part_id": "body_part_id"}]'
 *       204:
 *         description: No content
 */
router
  .route("/")
  .post(
    [
      body("exercise_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the new_exercise must have minimum length of 3")
        .trim(),
      body("compound")
        .isBoolean()
        .withMessage("the compound must be true or false")
        .trim(),
      body("body_part_id")
        .isNumeric()
        .withMessage("body_part_id is required.")
        .trim()
    ],
    validationUtils.validate,
    exercisesController.postExercises
  );
/**
 * @swagger
 * /exercises/{exercise_id}:
 *   put:
 *     tags: [
 *       exercises
 *     ]
 *     summary: Update an exercise by ID
 *     parameters:
 *      - name: exercise_id
 *        in: path
 *        type: interger
 *        description: The ID of the exercise
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              exercise_name:
 *                type: string
 *                required: true
 *                descriptions: The exercise name
 *              compound:
 *                type: boolean
 *                required: true
 *                descriptions: Is it a compound movement
 *              body_part_id:
 *                type: number
 *                required: true
 *                descriptions: The associated body part ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"exercise_name": "new_exercise", "compound": True/false, "body_part_id": "body_part_id"}]'
 *       204:
 *         description: No content
 */
router
  .route("/:exercise_id(\\d+)")
  .put(
    [
      body("exercise_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the new_exercise must have minimum length of 3")
        .trim(),
      body("compound")
        .isBoolean()
        .withMessage("the compound must be true or false")
        .trim(),
      body("body_part_id")
        .isNumeric()
        .withMessage("body_part_id is required.")
        .trim()
    ],
    validationUtils.validate,
    exercisesController.putExercises
  );

/**
 * @swagger
 * /exercises/{body_part_id}:
 *   get:
 *     tags: [
 *       exercises
 *     ]
 *     summary: Return all exercises associated with a body part
 *     parameters:
 *      - name: body_part_id
 *        in: path
 *        type: interger
 *        description: The ID of the body part
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"exercise_id": 1,"exercise_name": "Bench Press", "compound": True,"body_part_id": "1"}]'
 *       204:
 *         description: No content
 */
router
  .route("/:body_part_id(\\d+)")
  .get(exercisesController.getExercisesBodyId);

module.exports = router;
