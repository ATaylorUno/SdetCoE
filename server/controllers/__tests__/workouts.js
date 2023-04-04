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
});
