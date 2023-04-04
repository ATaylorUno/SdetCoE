const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const {
  workoutsRouter,
  exercisesRouter,
  routinesRouter,
  usersRouter,
  authenticationRouter
} = require("./routers");

const { verifyToken } = require("./middleware/authentication");

//const swaggerDocument = require('./open-api.json');

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Workout API",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const openapiSpecification = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routers/*.js"]
});

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) =>
  res.json(openapiSpecification).status(200)
);

app.use("/authentication", authenticationRouter);
app.all("*", verifyToken);
app.use("/users", usersRouter);
app.use("/workouts", workoutsRouter);
app.use("/exercises", exercisesRouter);
app.use("/routines", routinesRouter);

app.listen(3000);
