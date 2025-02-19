import RouteLayout from "./components/layouts/RouteLayout";

import { Routes, Route } from "react-router-dom";
import { GameBoard, GameSettings, LandingPage, PolicyPage } from "./routes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<RouteLayout/>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game-settings" element={<GameSettings />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/privacy-policy" element={<PolicyPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
