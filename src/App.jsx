import "tailwindcss/tailwind.css";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/mainPage";
import OutfitListPage from "./pages/outfitListPage";
import DailyOutfitCreatePage from "./pages/dailyOutfitCreatePage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveImages } from "./store/actions/imageAction";
import { convertImageToBase64 } from "./utils/base64Converter";
import { imagePaths } from "./constant/imagePath";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    convertImageToBase64(imagePaths, (base64Images) => {
      dispatch(saveImages(base64Images));
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/outfitlist" element={<OutfitListPage />} />
      <Route path="/pickoutfit" element={<DailyOutfitCreatePage />} />
    </Routes>
  );
}
