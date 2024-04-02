import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../api/weather.jsx";
import weatherDescKo from "../../api/weatherDescKo.js";
import { Card, CardTitle, CardContent, CardDescription } from "../ui/card.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useMediaQuery } from "react-responsive";

export default function DailyWeatherComponent() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 1024 });

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
    <>
      {isMobile ? (
        <Button
          className="fixed bottom-0 mx-auto left-0 right-0 w-full h-10 py-12 text-xl bg-blue-950 z-50 flex items-center rounded-tl-3xl rounded-tr-3xl"
          onClick={() => navigate("/pickoutfit")}
        >
          {Math.floor(weatherdata.degree)}°C의 날씨, 오늘은 뭘 입을까?
        </Button>
      ) : (
        <Card className="py-5 w-80 h-auto md:w-3/4 xl:w-3/4 xl:h-3/5 flex-col flex justify-around items-center rounded-3xl">
          <CardTitle className="p-3 font-ws xl:text-3xl text-xl underline decoration-sky-500/50 ">
            오늘의 날씨는?
          </CardTitle>
          <div className="flex-col flex justify-center items-center rounded-3xl w-3/4 h-1/2 p-10 bg-blue-800/60">
            <img
              className="w-20 xl:w-5/6"
              src={`http://openweathermap.org/img/wn/${weatherdata.icon}@2x.png`}
              alt=""
            />
            <div className="flex justify-center w-full">
              <CardTitle className="text-white font-semibold text-xl xl:text-4xl">
                {Math.floor(weatherdata.degree)}°C
              </CardTitle>
            </div>

            <CardTitle className="text-md xl:text-xl py-1 text-white text-center">
              {getWeatherDescription(weatherdata.id)}
            </CardTitle>
          </div>
          <Button
            className=" text-md xl:text-lg w-2/3 my-5 rounded-3xl bg-blue-900"
            onClick={() => navigate("/pickoutfit")}
          >
            오늘은 뭘 입을까?
          </Button>
        </Card>
      )}
    </>
  );
}
