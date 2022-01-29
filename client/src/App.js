import "./App.scss";
import LandingPage from "./components/LandingPage";
import CollegeDetail from "./components/CollegeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
import AuthProvider, { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/college/:id" element={<CollegeDetail />} />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
