import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";
import History from "./Pages/History";
import Tips from "./Pages/Tips";
import JDMatcher from "./Pages/JDMatcher";
import CoverLetter from "./Pages/CoverLetter";
import Compare from "./Pages/Compare";
import Roadmap from "./Pages/Roadmap";
import OAuthSuccess from "./Pages/OAuthSuccess";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/tips"
          element={
            <PrivateRoute>
              <Tips />
            </PrivateRoute>
          }
        />
        <Route
          path="/jd-matcher"
          element={
            <PrivateRoute>
              <JDMatcher />
            </PrivateRoute>
          }
        />
        <Route
          path="/cover-letter"
          element={
            <PrivateRoute>
              <CoverLetter />
            </PrivateRoute>
          }
        />
        <Route
          path="/compare"
          element={
            <PrivateRoute>
              <Compare />
            </PrivateRoute>
          }
        />
        <Route
          path="/roadmap"
          element={
            <PrivateRoute>
              <Roadmap />
            </PrivateRoute>
          }
        />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
