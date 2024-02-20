import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../api/weather.jsx";
import weatherDescKo from "../../api/weatherDescKo.js";
import { Card, CardTitle, CardContent, CardDescription } from "../ui/card.jsx";

export default function DailyWeatherComponent() {
  const navigate = useNavigate();

  const getWeatherDescription = (weatherId) => {
    const descriptionObject = weatherDescKo.find(desc => desc[weatherId]);
    return descriptionObject ? descriptionObject[weatherId] : "날씨 정보 없음";
  };

  const {
    data: weatherdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getWeather"],
    queryFn: fetchWeather,
  });

  if (isLoading) return <div>로딩중(로티같은거 넣기)</div>;
  if (error)
    return (
      <div>
        outfitlistpage 내 리액트 쿼리 중 getWeather 에러 발생 {error.message}
      </div>
    );

  return (
    <Card className="py-5 w-3/4 flex-col flex justify-center items-center">
      <CardTitle className="p-3 font-ws">오늘의 날씨는?</CardTitle>
     
      
        <img src={`http://openweathermap.org/img/wn/${weatherdata.icon}@2x.png`} alt="" />
        <div className="flex justify-center w-full">
          <CardTitle className="font-semibold px-2">Seoul</CardTitle>  
          <CardTitle className="text-blue-600/100 font-semibold">{weatherdata.degree}°C</CardTitle>
          </div>
        
        <CardDescription className="text-base py-1"> {getWeatherDescription(weatherdata.id)}</CardDescription>
       
 


    </Card>
  );
}
