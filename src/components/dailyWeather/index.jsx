import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../api/weather.jsx";
import weatherDescKo from "../../api/weatherDescKo.js";
import { Card, CardTitle, CardContent, CardDescription } from "../ui/card.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function DailyWeatherComponent() {
  const navigate = useNavigate();
  const getWeatherDescription = (weatherId) => {
    const descriptionObject = weatherDescKo.find((desc) => desc[weatherId]);
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
    <Card className="py-5 w-3/4 h-3/5 flex-col flex justify-around items-center rounded-3xl">
      <CardTitle className="p-3 font-ws text-3xl underline decoration-sky-500/50 ">
        오늘의 날씨는?
      </CardTitle>
      <div className="flex-col flex justify-center items-center rounded-3xl w-3/4 h-1/2 p-10 bg-teal-800/80">
        <img
          className="w-5/6"
          src={`http://openweathermap.org/img/wn/${weatherdata.icon}@2x.png`}
          alt=""
        />
        <div className="flex justify-center w-full">
          <CardTitle className="text-white font-semibold text-4xl">
            {weatherdata.degree}°C
          </CardTitle>
        </div>

        <CardTitle className="text-xl py-1 text-white">
          {getWeatherDescription(weatherdata.id)}
        </CardTitle>
      </div>
      <Button
        className="text-lg w-2/3 my-5 rounded-3xl bg-teal-800"
        onClick={() => navigate("/pickoutfit")}
      >
        오늘은 뭘 입을까?
      </Button>
    </Card>
  );
}
