import { Routes, Route } from "react-router-dom";
import { Asiakkaat, Yhteystiedot, Koti } from "./tehtavat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Koti />} />
        <Route path="yhteystiedot" element={<Yhteystiedot />} />
        <Route path="asiakkaat" element={<Asiakkaat />} />
      </Routes>
    </div>
  );
}

export default App;
