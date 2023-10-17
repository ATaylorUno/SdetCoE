import axios from "../utils/axios";

const authenticate = async (email, password) => {
  return await axios.post("authentication", {
    email,
    password
  });
};

const AuthService = { authenticate };

export default AuthService;
