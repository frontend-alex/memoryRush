import { Routes, Route } from "react-router-dom";
import { GameBoard, GameSettings, LandingPage } from "./routes";
import RouteLayout from "./components/layouts/RouteLayout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<RouteLayout/>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game-settings" element={<GameSettings />} />
          <Route path="/game" element={<GameBoard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
