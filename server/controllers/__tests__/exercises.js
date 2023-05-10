const { when } = require("jest-when");
const exercisesController = require("../exercises");
const prisma = require("../../utils/prisma");
//const bcrypt = require("bcrypt");
jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("exercises controller", () => {
  describe("getExercises", () => {
    it("Should return 204 when no exercises available", async () => {
      const res = {
        sendStatus: jest.fn()
      };

      const req = {
        query: {
          body_part_id: 1
        }
      };

      prisma.exercises = { findMany: jest.fn().mockReturnValueOnce([]) };
      //act

      await exercisesController.getExercises(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("Should return 200 when exercises available", async () => {
      const user = "1";
      const body_part_id = "1";
      const res = {
        locals: {
          user: user
        }
      };

      const req = {
        query: {
          body_part_id: body_part_id
        }
      };

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const exercises = [{}];

      const exercisesMock = jest.fn();
      when(exercisesMock)
        .calledWith(
          expect.objectContaining({
            where: {
              body_part_id: parseInt(body_part_id)
            }
          })
        )
        .mockReturnValueOnce(exercises);

      prisma.exercises = { findMany: exercisesMock };
      //act

      await exercisesController.getExercises(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(exercises);
    });
  });

  describe("createExercise", () => {
    it("Should return 200 when new exercise is created", async () => {
      const req = {
        body: {
          exercise_name: "Trap Bar Deadlift",
          compound: true,
          body_part_id: "8"
        }
      };
      const res = {};
      const createdExercise = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.exercises = {
        create: jest.fn().mockReturnValueOnce(createdExercise)
      };

      await exercisesController.postExercises(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(createdExercise);
    });
  });

  describe("updateExercise", () => {
    it("Should return 200 when new exercise is updated", async () => {
      const exercise_id = 1;
      const exercise_name = "Hex Bar Deadlift";
      const compound = true;
      const body_part_id = 8;
      const req = {
        body: {
          exercise_name: exercise_name,
          compound: compound,
          body_part_id: body_part_id
        },
        params: {
          exercise_id: exercise_id
        }
      };

      const res = {};

      res.sendStatus = jest.fn().mockReturnValue(res);

      prisma.exercises = {
        update: jest.fn()
      };
      //act
      await exercisesController.putExercises(req, res);
      //assert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(prisma.exercises.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: exercise_id
          }),
          data: expect.objectContaining({
            exercise_name: exercise_name,
            compound: compound,
            body_part_id: body_part_id
          })
        })
      );
    });
  });

  describe("getExerciseByBodyPartId", () => {
    it("Should return 404 when no exercises are returned by bodypartid", async () => {
      const body_part_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          body_part_id: body_part_id
        }
      };
      res.sendStatus = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.exercises = { findMany: jest.fn() };

      await exercisesController.getExercisesBodyId(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
    it("Should return 200 when returning exercises by bodypartid", async () => {
      const body_part_id = "1";
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };
      const req = {
        params: {
          body_part_id: body_part_id
        }
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      const exercises = [{}];
      const exercisesMock = jest.fn();
      when(exercisesMock)
        .calledWith(
          expect.objectContaining({
            where: {
              body_part_id: parseInt(req.params.body_part_id)
            }
          })
        )
        .mockReturnValueOnce(exercises);

      prisma.exercises = { findMany: exercisesMock };
      //act

      await exercisesController.getExercisesBodyId(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(exercises);
    });
  });
});
