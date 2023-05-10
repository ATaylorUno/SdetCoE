const request = require("supertest");
const app = require("../../app");

describe("/exercises", () => {
  describe("GET /exercises", () => {
    it("respond with json containing a list of a exercises", async () => {
      await request(app)
        .get("/exercises")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  describe("GET /exercises/:bodyPartId", () => {
    it("respond with a 200 response & exercises associated with a body part", async () => {
      await request(app)
        .get("/exercises/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("respond with 404 when no exercises are found by associated body part id", async () => {
      await request(app)
        .get("/exercises/100")
        .set("Accept", "application/json")
        .expect(404);
    });
  });
  describe("POST /exercises", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyExercisesValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                param: "exercise_name",
                msg: "Invalid value",
                location: "body"
              }),
              expect.objectContaining({
                param: "compound",
                msg: "the compound must be true or false",
                location: "body"
              }),
              expect.objectContaining({
                param: "body_part_id",
                msg: "body_part_id is required.",
                location: "body"
              })
            ])
          })
        );
      };
      await request(app)
        .post("/exercises")
        .send({})
        .expect(400)
        .expect(verifyExercisesValidation);
    });
    it("respond with 200 when an exercise is created", async () => {
      await request(app)
        .post("/exercises")
        .set("Accept", "application/json")
        .send({
          exercise_name: "testEN",
          compound: true,
          body_part_id: "1"
        })
        .expect(200);
    });
  });
  describe("PUT /exercises/:exercise_id", () => {
    it("respond with 400 response when missing data", async () => {
      const verifyExercisesValidation = (res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.arrayContaining([
              expect.objectContaining({
                param: "exercise_name",
                msg: "Invalid value",
                location: "body"
              }),
              expect.objectContaining({
                param: "compound",
                msg: "the compound must be true or false",
                location: "body"
              }),
              expect.objectContaining({
                param: "body_part_id",
                msg: "body_part_id is required.",
                location: "body"
              })
            ])
          })
        );
      };
      await request(app)
        .put("/exercises/1")
        .send({})
        .expect(400)
        .expect(verifyExercisesValidation);
    });
    it("respond with 404 when an exercise is not found.", async () => {
      await request(app)
        .put("/exercises/100")
        .set("Accept", "application/json")
        .send({
          exercise_name: "testEN",
          compound: true,
          body_part_id: "1"
        })
        .expect(404);
    });
    it("respond with 200 when an exercise is updated", async () => {
      await request(app)
        .put("/exercises/1")
        .set("Accept", "application/json")
        .send({
          exercise_name: "testEN",
          compound: true,
          body_part_id: "1"
        })
        .expect(204);
    });
  });
});
