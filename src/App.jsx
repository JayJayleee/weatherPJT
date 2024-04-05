import "tailwindcss/tailwind.css";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/mainPage";
import OutfitListPage from "./pages/outfitListPage";
import DailyOutfitCreatePage from "./pages/dailyOutfitCreatePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/outfitlist" element={<OutfitListPage />} />
      <Route path="/pickoutfit" element={<DailyOutfitCreatePage />} />
    </Routes>
  );
}
