const { Router } = require("express");
const router = Router();
const validationUtils = require("../utils/validation");
const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { workoutsController } = require("../controllers/");

/**
 * @swagger
 * /workouts:
 *   get:
 *     tags: [
 *       workouts
 *     ]
 *     summary: Return all workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"workout_id": 5,"name": "Upper Day", "date_created": Date, "routine_id": 4 },{"workout_id": 9, "name": "Lower Day","date_created":Date,"routine_id": 4}]'
 *       204:
 *         description: No content
 */
router.route("/").get(workoutsController.getWorkouts);
/**
 * @swagger
 * /workouts/{workout_id}/exercises:
 *   get:
 *     tags: [
 *       workouts
 *     ]
 *     summary: Return a list of exercises within a workout
 *     parameters:
 *      - name: workout_id
 *        in: path
 *        type: interger
 *        description: The ID of the workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"exercise_id": 1,"exercise_name": "Bench Press", "compound": True, "reps": "5", "difficulty": "5", "body_part_id": "1"},{"exercise_id": 2, "exercise_name": "Incline DB Chest Press","compound": True, "reps": "8", "difficulty": "3", "body_part_id": "7"}]'
 *       204:
 *         description: No content
 */
router
  .route("/:workout_id(\\d+)/exercises")
  .get(workoutsController.getExercisesByWorkoutId);

module.exports = router;
