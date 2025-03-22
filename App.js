import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminModule from "./AdminModule";
import LearningPage from "./LearningPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminModule />} />
        <Route path="/learn" element={<LearningPage />} />
      </Routes>
    </Router>
  );
}

export default App;
