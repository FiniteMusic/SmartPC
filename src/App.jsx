import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Recomendador from "./Recomendador";
import AdminScraping from "./admin/scraping/AdminScraping";
import Glosario from "./glosario/Glosario";
import AvisoPrivacidad from "./legales/AvisoPrivacidad";
import TerminosUso from "./legales/TerminosUso";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recomendador" element={<Recomendador />} />
        <Route path="/admin/scraping" element={<AdminScraping />} />
        <Route path="/glosario" element={<Glosario />} />
        <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
        <Route path="/terminos-uso" element={<TerminosUso />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;