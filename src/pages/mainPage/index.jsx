import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex justify-center items-center h-screen bg-slate-100">
      <img
        className="absolute z-0 w-full float h-full object-cover"
        src="/image/main.png"
        alt="main"
      />

      <div className="z-10 flex flex-col items-center">
        <img className="w-2/3 mb-5" src="/image/logo.png" alt="logo" />
        <Button
          className="px-3 py-4 font-ws w-1/4 text-xl"
          onClick={() => navigate("/outfitlist")}
        >
          코디 시작하기
        </Button>
      </div>
    </div>
  );
}
