import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Home from "./Components/Home";
import Register from "./Pages/Register";
import MyDashboard from "./Pages/MyDashboard";
import ViewTodo from "./Pages/ViewTodo";
import ViewTrash from "./Pages/ViewTrash";

const isAuthenticated = () => {
  // You can extend this to check the JWT token or session expiration if needed
  return sessionStorage.getItem("user") !== null;
};

const ProtectedRoutes = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace={true} />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace={true} />
          ) : (
            <Register />
          )
        }
      />
      <Route path="/logout" element={<Logout />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <MyDashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/todo/:id"
        element={
          <ProtectedRoutes>
            <ViewTodo />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/trash"
        element={
          <ProtectedRoutes>
            <ViewTrash />
          </ProtectedRoutes>
        }
      />

      {/* Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
