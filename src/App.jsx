import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoxPage from "./pages/BoxPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/box/:boxId" element={<BoxPage />} />
    </Routes>
  );
}

export default App;