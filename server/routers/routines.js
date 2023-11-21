const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();
const { routinesController } = require("../controllers/");
const validationUtils = require("../utils/validation");

/**
 * @swagger
 * /routines:
 *   get:
 *     tags: [
 *       routines
 *     ]
 *     summary: Returns an array of routines with the routine_id, name, frequency and user ID associated
 *     parameters:
 *      - name: start_date
 *        in: query
 *        type: date
 *        description: The filter for the start date
 *      - name: finish_date
 *        in: query
 *        type: date
 *        description: The filter for user finish date
 *      - name: frequency
 *        in: query
 *        type: interger
 *        description: The filter for frequency
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"routine_id": 1,"name","Bulking routine", "start_date": "2023/11/04", "finish_date": "2024/01/13", "frequency": "4x","user_id": "1"},{"routine_id": 2, "name": "Bulking routine", "start_date": "2024/11/04", "finish_date": "2025/01/13", "frequency": "5x","user_id": "2"}]'
 *       204:
 *         description: No content
 */
router.route("/").get(routinesController.getRoutines);

/**
 * @swagger
 * /routines/{user_id}:
 *   get:
 *     tags: [
 *       routines
 *     ]
 *     summary: Return all routines for a given user
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
 *                 value: '[{"routine_id": 1,"name","Bulking routine", "start_date": "2023/11/04", "finish_date": "2024/01/13", "frequency": "4x","user_id": "1"}]'
 *       204:
 *         description: No content
 */
router.route("/:user_id(\\d+)").get(routinesController.getRoutinesByUserID);
/**
 * @swagger
 * /routines/{routine_id}/workouts:
 *   get:
 *     tags: [
 *       routines
 *     ]
 *     summary: Get workouts assoicated with a routine
 *     parameters:
 *      - name: routine_id
 *        in: path
 *        type: interger
 *        description: The ID of the routine
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"workout_id": 1, "name": "Chest Day", "date_created": Date,"routine_id": 1}]'
 *       204:
 *         description: No content
 */
router
  .route("/:routine_id(\\d+)/workouts/")
  .get(routinesController.getRoutineWorkout);

/**
 * @swagger
 * /routines/{routine_id}/exercises:
 *   get:
 *     tags: [
 *       routines
 *     ]
 *     summary: Get exercises assoicated with a routine
 *     parameters:
 *      - name: routine_id
 *        in: path
 *        type: interger
 *        description: The ID of the routine
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"exercise_id": 4,"exercise_name": "Shoulder Press", "compound": True,"body_part_id": "5"},]'
 *       204:
 *         description: No content
 */
router
  .route("/:routine_id(\\d+)/exercises/")
  .get(routinesController.getExerciseRoutine);

/**
 * @swagger
 * /routines:
 *   post:
 *     tags: [
 *       routines
 *     ]
 *     summary: Create a new routine
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                required: true
 *                descriptions: The routine name
 *              start_date:
 *                type: date
 *                required: true
 *                descriptions: The start date of the routine
 *              finish_date:
 *                type: date
 *                required: true
 *                descriptions: The finish date of the routine
 *              frequency:
 *                type: int
 *                required: true
 *                descriptions: The frequency of the routine
 *              user_id:
 *                type: int
 *                required: true
 *                descriptions: The user ID relating to the routine
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"name","Bulking routine", "start_date": "2023/11/04", "finish_date": "2024/01/13", "frequency": 4, "user_id": 1]'
 *       204:
 *         description: No content
 */
router
  .route("/")
  .post(
    [
      body("name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("the new routine must have minimum length of 3")
        .trim(),
      body("start_date")
        .isDate()
        .withMessage(
          "the start date must be in correct date format eg 2022-01-01"
        )
        .trim(),
      body("finish_date")
        .isDate()
        .withMessage(
          "the finish date must be in correct date format eg 2022-11-11"
        )
        .trim(),
      body("frequency")
        .isNumeric()
        .withMessage("Frequency is required.")
        .trim(),
      body("user_id").isNumeric().withMessage("User Id is required.").trim()
    ],
    validationUtils.validate,
    routinesController.createRoutines
  );
module.exports = router;
