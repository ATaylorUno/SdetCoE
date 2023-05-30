const axios = require("axios");

describe("Users", () => {
  test("Create and verify users", async () => {
    const createUserResponse = await axios.post("http://localhost:3001/users", {
      first_name: "Andrew",
      second_name: "Taylor",
      password: "password"
    });
    console.log(createUserResponse);

    expect(createUserResponse.status).toBe(201);
    const { id } = createUserResponse.data;

    const authenticationUserResponse = await axios.post(
      `http://localhost:3001/authentication/`,
      {
        first_name: "Andrew",
        second_name: "Taylor",
        password: "password"
      }
    );

    expect(authenticationUserResponse.status).toBe(200);

    const retrieveUserResponse = await axios.get(
      `http://localhost:3001/users/${id}`,
      {
        headers: {
          authorization: `bearer ${authenticationUserResponse.data.accessToken}`
        }
      }
    );

    expect(retrieveUserResponse.status).toBe(200);
  });
});
