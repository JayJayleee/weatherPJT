import { firestore } from "../../firebase-config.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchWeather = async () => {
  const weatherInfo = await firestore.collection("weatherInfo").doc("weather_item").get();
  return weatherInfo.data();
};

export default function DailyWeatherComponent(){
    const navigate = useNavigate();
    const { data: weatherdata, isLoading, error } = useQuery({
      queryKey: ['getWeather'],
      queryFn: fetchWeather,
    });

    if (isLoading) return <div>로딩중(로티같은거 넣기)</div>;
    if (error) return <div>outfitlistpage 내 리액트 쿼리 중 getWeather 에러 발생 {error.message}</div>;

    return <div className="App">
        <p>서울은 {weatherdata.degree}도이고 날씨는 {weatherdata.status} </p>
        <button onClick={()=>navigate("/pickoutfit") }>이 날씨에 맞는 옷 찾기</button></div>;
}