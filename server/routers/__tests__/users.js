const request = require("supertest");
const app = require("../../app");

describe("/users", () => {
  describe("GET /users", () => {
    it("respond with json containing a list of a users", async () => {
      await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /users/:userId", () => {
    it("respond with 200 response & user found by id", async () => {
      await request(app)
        .get("/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("respond with 404 when no user is found by id", async () => {
      await request(app)
        .get("/users/100")
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("POST /users", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyUsersValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                param: "first_name",
                msg: "Invalid value",
                location: "body"
              }),
              expect.objectContaining({
                param: "second_name",
                msg: "Invalid value",
                location: "body"
              }),
              expect.objectContaining({
                param: "email",
                msg: "email is required",
                location: "body"
              }),
              expect.objectContaining({
                param: "password",
                msg: "password is required",
                location: "body"
              })
            ])
          })
        );
      };
      await request(app)
        .post("/users")
        .send({})
        .expect(400)
        .expect(verifyUsersValidation);
    });
    it("respond with 201 when a user is created", async () => {
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({
          first_name: "testFN",
          second_name: "testLn",
          email: "testEmail",
          password: "testPassword"
        })
        .expect(201);
    });
  });
  describe("PUT /users/:userId", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyUsersValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                param: "first_name",
                msg: "Invalid value",
                location: "body"
              }),
              expect.objectContaining({
                param: "second_name",
                msg: "Invalid value",
                location: "body"
              }),
              expect.objectContaining({
                param: "email",
                msg: "email is required",
                location: "body"
              }),
              expect.objectContaining({
                param: "password",
                msg: "password is required.",
                location: "body"
              })
            ])
          })
        );
      };
      await request(app)
        .put("/users/1")
        .send({})
        .expect(400)
        .expect(verifyUsersValidation);
    });
    it("respond with 404 when a user is not found.", async () => {
      await request(app)
        .put("/users/100")
        .set("Accept", "application/json")
        .send({
          first_name: "testFN",
          second_name: "testLn",
          email: "testEmail",
          password: "testPassword"
        })
        .expect(404);
    });
    it("respond with 204 when a user is updated.", async () => {
      await request(app)
        .put("/users/1")
        .set("Accept", "application/json")
        .send({
          first_name: "testFN",
          second_name: "testLn",
          email: "testEmail",
          password: "testPassword"
        })
        .expect(204);
    });
  });
});
