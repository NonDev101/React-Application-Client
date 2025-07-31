import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import SearchPage from "./pages/SearchPage";
import RecipeDetail from "./pages/RecipeDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
