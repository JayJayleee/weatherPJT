import "tailwindcss/tailwind.css";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/mainPage";
import OutfitListPage from "./pages/outfitListPage";
import DailyOutfitCreatePage from "./pages/dailyOutfitCreatePage";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveImages } from "./store/actions/imageAction";
import { convertImageToBase64 } from "./utils/base64Converter";
import { imagePath } from "./constant/imagePath";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import loadingAnimation from "./assets/lottie/loading.json";

export default function App() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수 추가

  useEffect(() => {
    if (images.length === 0) {
      convertImageToBase64(imagePath, (base64Images) => {
        dispatch(saveImages(base64Images));
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, images.length]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-sky-100">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/outfitlist" element={<OutfitListPage />} />
      <Route path="/pickoutfit" element={<DailyOutfitCreatePage />} />
    </Routes>
  );
}
