import { firestore } from "../../firebase-config.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DailyWeatherComponent(){
    const navigate = useNavigate();
    const [weather, setWeather] = useState({degree:0, status:""});
    useEffect(() => {
  
      const bucket = firestore.collection("weatherInfo");
  
      bucket
        .doc("weather_item")
        .get()
        .then((doc) => {
          setWeather({
            degree: doc.data().degree,
            status: doc.data().status,
          })
        });
    })

    return <div className="App">
        <p>서울은 {weather.degree}도이고 날씨는 {weather.status} </p>
        <button onClick={()=>navigate("/pickoutfit") }>이 날씨에 맞는 옷 찾기</button></div>;
}