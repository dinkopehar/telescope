import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./utils/checkAuth";

// Lazy loading pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
// TODO: Add forgot password page
//const Layout = lazy(() => import("./containers/Layout"));

const accessToken = checkAuth();

const App: React.FC = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback route for undefined paths */}
        <Route
          path="*"
          element={
            <Navigate to={accessToken ? "/app/welcome" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
