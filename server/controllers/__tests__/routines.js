const { when } = require("jest-when");
const routinesController = require("../routines");
const prisma = require("../../utils/prisma");
jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("routines controller", () => {
  describe("getRoutines", () => {
    it("Should return 204 when no routines available", async () => {
      const user = 1;
      const req = {
        query: {
          frequency: 4
        }
      };
      const res = {
        locals: {
          user: user
        },
        sendStatus: jest.fn()
      };

      prisma.routines = { findMany: jest.fn().mockReturnValueOnce([]) };
      //act
      await routinesController.getRoutines(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("Should return 200 when routines available", async () => {
      const user = "1";
      const frequency = "4";

      const req = {
        query: {
          frequency: frequency
        }
      };

      const res = {
        locals: {
          user: user
        }
      };

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const routines = [{}];

      const routinesMock = jest.fn();
      when(routinesMock)
        .calledWith(
          expect.objectContaining({
            where: {
              frequency: parseInt(frequency),
              user_id: parseInt(user)
            }
          })
        )
        .mockReturnValueOnce(routines);

      prisma.routines = { findMany: routinesMock };
      //act

      await routinesController.getRoutines(req, res);
      //asert

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(routines);
    });
  });
  describe("getRoutinesByUserID", () => {
    it("Should return 404 when no routines are returned by bodypartid", async () => {
      const user_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          user_id: user_id
        }
      };
      res.sendStatus = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.routines = { findUnique: jest.fn() };

      await routinesController.getRoutinesByUserID(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
    it("Should return 200 when returning routines by bodypartid", async () => {
      const user_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          user_id: user_id
        }
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      const routines = [{}];
      const routinesMock = jest.fn();
      when(routinesMock)
        .calledWith(
          expect.objectContaining({
            where: {
              id: parseInt(req.params.user_id)
            }
          })
        )
        .mockReturnValueOnce(routines);

      prisma.routines = { findUnique: routinesMock };
      //act

      await routinesController.getRoutinesByUserID(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(routines);
    });
  });
  describe("getRoutineWorkout", () => {
    it("Should return 404 when no routines are returned by bodypartid", async () => {
      const routine_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          routine_id: routine_id
        }
      };
      res.sendStatus = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.workouts = { findUnique: jest.fn() };

      await routinesController.getRoutineWorkout(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
    it("Should return 200 when returning routines by bodypartid", async () => {
      const routine_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          routine_id: routine_id
        }
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      const routines = [{}];
      const routinesMock = jest.fn();
      when(routinesMock)
        .calledWith(
          expect.objectContaining({
            where: {
              id: parseInt(req.params.routine_id)
            }
          })
        )
        .mockReturnValueOnce(routines);

      prisma.workouts = { findUnique: routinesMock };
      //act

      await routinesController.getRoutineWorkout(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(routines);
    });
  });
  describe("getExerciseRoutine", () => {
    it("Should return 404 when no routines are returned by bodypartid", async () => {
      const routine_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          routine_id: routine_id
        }
      };
      res.sendStatus = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.routine_exercises = { findUnique: jest.fn() };

      await routinesController.getExerciseRoutine(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
    it("Should return 200 when returning routines by bodypartid", async () => {
      const routine_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          routine_id: routine_id
        }
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      const routines = [{}];
      const routinesMock = jest.fn();
      when(routinesMock)
        .calledWith(
          expect.objectContaining({
            where: {
              id: parseInt(req.params.routine_id)
            }
          })
        )
        .mockReturnValueOnce(routines);

      prisma.routine_exercises = { findUnique: routinesMock };
      //act

      await routinesController.getExerciseRoutine(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(routines);
    });
  });
});
