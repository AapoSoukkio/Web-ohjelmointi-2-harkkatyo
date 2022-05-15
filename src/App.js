import { Routes, Route } from "react-router-dom";
import { Tavarat, Koti } from "./tavarat";
import { Muokkaa} from "./muokkaa";
import {Lisaa} from "./lisaa"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Koti />} />
        <Route path="muokkaa" element={<Muokkaa />} />
        <Route path="tavarat" element={<Tavarat />} />
        <Route path="lisaa" element={<Lisaa />} />
      </Routes>
    </div>
  );
}

export default App;
