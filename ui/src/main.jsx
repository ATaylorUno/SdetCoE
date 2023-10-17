import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthContext from "./contexts/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext.AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContext.AuthProvider>
);
