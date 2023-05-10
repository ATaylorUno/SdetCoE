const request = require("supertest");
const app = require("../../app");

describe("/routines", () => {
  describe("GET /routines", () => {
    it("respond with json containing a list of a routines", async () => {
      await request(app)
        .get("/routines")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  describe("GET /routines/:userId", () => {
    it("respond with 200 response & user found by id", async () => {
      await request(app)
        .get("/routines/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("respond with 404 when no user is found by id", async () => {
      await request(app)
        .get("/routines/100")
        .set("Accept", "application/json")
        .expect(404);
    });
  });
  describe("GET /routines/:routine_id/workouts", () => {
    it("respond with a 200 response & Exercises within a routine", async () => {
      await request(app)
        .get("/routines/1/workouts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("respond with 404 when no exercises are found within a routine", async () => {
      await request(app)
        .get("/routines/1000/workouts")
        .set("Accept", "application/json")
        .expect(404);
    });
  });
  describe("GET /routines/:routine_id/exercises", () => {
    it("respond with a 200 response & Exercises within a routine", async () => {
      await request(app)
        .get("/routines/1/exercises")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("respond with 404 when no exercises are found within a routine", async () => {
      await request(app)
        .get("/routines/1000/exercises")
        .set("Accept", "application/json")
        .expect(404);
    });
  });
});
