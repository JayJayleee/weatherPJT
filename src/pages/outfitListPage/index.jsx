import React from "react";
import DailyWeatherComponent from "../../components/dailyWeather";
import { Button } from "../../components/ui/button";
import OutfitList from "../../components/outfitList";

export default function OutfitListPage() {
  return (
    <div className="w-full grid grid-cols-4 gap-5min-h-screen bg-teal-700/30">
      <div className=" h-screen w-5/6 col-span-1 flex flex-col justify-center items-center ">
        <DailyWeatherComponent />
      </div>
      <div className="w-full h-screen  col-span-3 flex flex-col">
        <div className="m-8 px-2 py-3 w-1/3 rounded-full font-ws text-5xl font-extrabold  text-center self-center underline decoration-cyan-500/50 ">
          기상 천외한 옷장 LIST
        </div>
        <OutfitList />
      </div>
    </div>
  );
}
