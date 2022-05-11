import { Routes, Route } from "react-router-dom";
import { Tavarat, Lisatiedot, Koti } from "./tehtavat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Koti />} />
        <Route path="muokkaa" element={<Lisatiedot />} />
        <Route path="tavarat" element={<Tavarat />} />
      </Routes>
    </div>
  );
}

export default App;
