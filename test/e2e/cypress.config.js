const { defineConfig } = require("cypress");
const path = require("path");
const { DockerComposeEnvironment, Wait } = require("testcontainers");
let composeContainer;

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  video: true,
  reporterOptions: {
    // embeddedScreenshots: true,
    // reportDir: "cypress/results"
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      on("before:browser:launch", async (browser = {}, launchOptions) => {
        console.log("before:browser:launch");
        const composeFilePath = path.resolve(__dirname, "../../");
        const composeFile = "docker-compose.yml";
        // need to add profile and message
        composeContainer = await new DockerComposeEnvironment(
          composeFilePath,
          composeFile
        )
          .withWaitStrategy("ui-1", Wait.forLogMessage(/^VITE v4.3./))
          .up();

        await new Promise((x) => setTimeout(x, 500));
        return launchOptions;
      });
      on("after:run", async (details) => {
        await composeContainer?.down();
      });
    }
  }
});
