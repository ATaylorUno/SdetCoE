const { Router } = require("express");
const router = Router();
const { routinesController } = require("../controllers/");

/**
 * @swagger
 * /routines:
 *   get:
 *     tags: [
 *       routines
 *     ]
 *     summary: Returns an array of routines with the routine_id, name, frequency and user ID associated
 *     parameters:
 *      - name: weeks
 *        in: query
 *        type: interger
 *        description: The filter for user first name
 *      - name: frequency
 *        in: query
 *        type: interger
 *        description: The filter for user second name
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"routine_id": 1,"name","Bulking routine", "weeks": "12", "frequency": "4x","user_id": "1"},{"routine_id": 2, "name": "Bulking routine", "weeks": "16", "frequency": "5x","user_id": "2"}]'
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
 *                 value: '[{"routine_id": 1,"name","Bulking routine", "weeks": "12", "frequency": "4x","user_id": "1"}]'
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

module.exports = router;
