const { when } = require("jest-when");
const usersController = require("../users");
const prisma = require("../../utils/prisma");
const bcrypt = require("bcrypt");
jest.mock("@prisma/client");
jest.mock("../../utils/prisma");
jest.mock("bcrypt");

describe("users controller", () => {
  describe("getUser", () => {
    it("Should return 204 when no users available", async () => {
      const res = {
        sendStatus: jest.fn()
      };

      const req = {
        query: {
          first_name: "Andrew",
          second_name: "Taylor",
          email: "andrewtaylor@gmail.com"
        }
      };

      prisma.users = { findMany: jest.fn().mockReturnValueOnce([]) };
      //act

      await usersController.getUser(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("Should return 200 when users available", async () => {
      const user = "1";
      const res = {
        locals: {
          user: user
        }
      };

      const req = {
        query: {
          first_name: "Andrew",
          second_name: "Taylor",
          email: "andrewtaylor@gmail.com"
        }
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const users = [{}];

      const usersMock = jest.fn();
      when(usersMock)
        .calledWith(
          expect.objectContaining({
            where: {
              first_name: {
                startsWith: "Andrew",
                mode: "insensitive"
              },
              second_name: {
                startsWith: "Taylor",
                mode: "insensitive"
              },
              email: {
                startsWith: "andrewtaylor@gmail.com",
                mode: "insensitive"
              },
              select: {
                id: true,
                first_name: true,
                second_name: true,
                email: true
              }
            }
          })
        )
        .mockReturnValueOnce(users);

      prisma.users = { findMany: usersMock };
      //act

      await usersController.getUser(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("createUser", () => {
    it("Should return 201 when user is created", async () => {
      const req = {
        body: {
          first_name: "Andrew",
          second_name: "Taylor",
          email: "andrewtaylor@gmail.com",
          password: "testPassword"
        }
      };

      const user = "1";
      const res = {};
      const createdUser = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.users = {
        create: jest.fn().mockReturnValueOnce(createdUser)
      };

      await usersController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdUser);
    });
  });
  describe("updateUser", () => {
    it("Should return 204 when user is updated", async () => {
      // arrange
      const user_id = 1;
      const password = "testPassword";
      const first_name = "Andrew";
      const second_name = "Taylor";
      const email = "andrewtaylor@gmail.com";
      const hashedPassword = "testHashPassword";
      const req = {
        body: {
          first_name: first_name,
          second_name: second_name,
          email: email,
          password: password
        },
        params: {
          user_id: user_id
        }
      };

      when(bcrypt.hash)
        .calledWith(password, 10)
        .mockReturnValueOnce(hashedPassword);

      const res = {};

      res.sendStatus = jest.fn().mockReturnValue(res);

      prisma.users = {
        update: jest.fn()
      };

      // act
      await usersController.updateUser(req, res);

      // assert
      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(prisma.users.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: user_id
          }),
          data: expect.objectContaining({
            first_name: first_name,
            second_name: second_name,
            email: email,
            password: hashedPassword
          })
        })
      );
    });
  });
  describe("getUserByID", () => {
    it("Should return 404 when no users available", async () => {
      const user_id = "1";
      const res = {
        sendStatus: jest.fn()
      };

      const req = {
        params: {
          user_id: user_id
        }
      };

      prisma.users = { findUnique: jest.fn() };
      //act

      await usersController.getUserById(req, res);
      //asert
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it("Should return 200 when users available", async () => {
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

      const users = [{}];

      const usersMock = jest.fn();
      when(usersMock)
        .calledWith(
          expect.objectContaining({
            where: {
              id: parseInt(req.params.user_id)
            }
          })
        )
        .mockReturnValueOnce(users);

      prisma.users = { findUnique: usersMock };
      //act

      await usersController.getUserById(req, res);
      //asert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
});
