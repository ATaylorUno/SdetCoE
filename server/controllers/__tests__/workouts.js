const { when } = require("jest-when");
const workoutsController = require("../workouts");
const prisma = require("../../utils/prisma");
jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("workouts controller", () => {
  describe("getWorkouts", () => {
    it("Should return 204 when no workouts available", async () => {
      const res = {
        locals: {
          user: 1
        },
        sendStatus: jest.fn()
      };
      prisma.workouts = { findMany: jest.fn().mockReturnValueOnce([]) };
      //act

      await workoutsController.getWorkouts(undefined, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("Should return 200 when workouts available", async () => {
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const workouts = [{}];

      const workoutsMock = jest.fn();
      when(workoutsMock)
        .calledWith(
          expect.objectContaining({
            where: {
              routines: {
                user_id: parseInt(user)
              }
            }
          })
        )
        .mockReturnValueOnce(workouts);

      prisma.workouts = { findMany: workoutsMock };
      //act

      await workoutsController.getWorkouts(undefined, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(workouts);
    });
  });

  describe("getExercisesByWorkoutId", () => {
    it("Should return 204 not returning exercises by workoutID", async () => {
      const workout_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          workout_id: workout_id
        }
      };

      res.sendStatus = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.workouts = { findUnique: jest.fn() };

      //act

      await workoutsController.getExercisesByWorkoutId(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
    it("Should return 200 when returning exercises by workoutID", async () => {
      const workout_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          workout_id: workout_id
        }
      };

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      const exercises = {};
      const workouts = {
        workout_exercises: [
          {
            exercises: exercises
          }
        ]
      };

      const workoutsMock = jest.fn();

      when(workoutsMock)
        .calledWith(
          expect.objectContaining({
            where: {
              id: parseInt(workout_id)
            },
            select: {
              workout_exercises: {
                select: {
                  exercises: true
                }
              }
            }
          })
        )
        .mockReturnValueOnce(workouts);

      prisma.workouts = { findUnique: workoutsMock };

      //act

      await workoutsController.getExercisesByWorkoutId(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([exercises])
      );
    });
  });
});
