import React from "react";
import DailyWeatherComponent from "../../components/dailyWeather";
import { Button } from "../../components/ui/button";
import OutfitList from "../../components/outfitList";

export default function OutfitListPage() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 xl:gap-5 h-screen bg-sky-700/30 overflow-hidden">
      <div className="lg:h-screen w-full flex flex-col justify-center items-center my-10">
        <DailyWeatherComponent />
      </div>
      <div className="w-full h-screen lg:col-span-3 col-span-1 flex flex-col overflow-hidden">
        <div className="lg:m-8 px-2 py-3 w-auto rounded-full font-ws text-3xl lg:text-5xl font-extrabold text-center self-center underline decoration-sky-500/50">
          기상 천외한 옷장 LIST
        </div>
        <OutfitList />
      </div>
    </div>
  );
}
