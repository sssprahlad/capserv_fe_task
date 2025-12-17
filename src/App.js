import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import SignUp from "./Components/Pages/SignUp/SignUp";
import Login from "./Components/Pages/Login/Login";
import { UserProvider } from "./Components/Context/AuthContext";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import { useState } from "react";
import Footer from "./Components/Footer/Footer";
function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/signUp"
              element={<SignUp setSnackbar={setSnackbar} snackbar={snackbar} />}
            />
            <Route
              path="/login"
              element={<Login setSnackbar={setSnackbar} snackbar={snackbar} />}
            />
            <Route
              element={
                <ProtectedRouter
                  setSnackbar={setSnackbar}
                  snackbar={snackbar}
                />
              }
            >
              <Route
                path="/dashboard"
                element={
                  <Dashboard setSnackbar={setSnackbar} snackbar={snackbar} />
                }
              />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
