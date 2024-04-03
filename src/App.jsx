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

export default function App() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수 추가

  useEffect(() => {
    if (images.length === 0) {
      convertImageToBase64(imagePath, (base64Images) => {
        dispatch(saveImages(base64Images));
        setIsLoading(false); // 이미지 변환 작업이 완료되면 로딩 상태를 false로 설정
      });
    } else {
      setIsLoading(false); // 이미지가 이미 존재한다면 바로 로딩 상태를 false로 설정
    }
  }, [dispatch, images.length]);

  // 로딩 중일 때 로딩 화면을 보여줍니다.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>로딩 중...</p>{" "}
        {/* 여기에 로티 애니메이션이나 다른 로딩 인디케이터를 넣을 수 있습니다. */}
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
