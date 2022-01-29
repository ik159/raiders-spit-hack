import "./App.scss";
import LandingPage from "./components/LandingPage";
import CollegeDetail from "./components/CollegeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/college/:id" element={<CollegeDetail />} />
    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
