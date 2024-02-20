import React from 'react'
import { useNavigate } from "react-router-dom";
import DailyWeatherComponent from '../../components/dailyWeather'
import { Button } from '../../components/ui/button';
import OutfitList from '../../components/outfitList';

export default function OutfitListPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full grid grid-cols-4 gap-5  bg-sky-100 min-h-screen">

      <div className='h-screen col-span-1 flex flex-col justify-center items-center'>
         <DailyWeatherComponent/>
         <Button className="text-lg w-3/4 my-5" onClick={() => navigate("/pickoutfit")}>
        오늘은 뭘 입을까?
      </Button>
      </div>
      <div className='w-full h-screen bg-slate-100 col-span-3 flex flex-col'>
        <div className="mt-8 px-2 py-3 w-1/3 rounded-full font-ws text-xl font-extrabold text-white text-center self-center bg-sky-700">
          그전의 코디 리스트 목록
          </div>
       <OutfitList/>
        </div>
       
    </div>
  )
}
