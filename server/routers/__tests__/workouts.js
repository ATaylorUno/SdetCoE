const request = require("supertest");
const app = require("../../app");

describe("/workouts", () => {
  describe("GET /workouts", () => {
    it("respond with json containing a list of a workouts", async () => {
      await request(app)
        .get("/workouts")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  describe("GET /:workoutId/exercises", () => {
    it("respond with a 200 response & Exercises within a workout", async () => {
      await request(app)
        .get("/workouts/1/exercises")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("respond with 404 when no exercises are found within a workout", async () => {
      await request(app)
        .get("/workouts/100/exercises")
        .set("Accept", "application/json")
        .expect(204);
    });
  });
});
