import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Recomendador from "./Recomendador";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recomendador" element={<Recomendador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;