import "./App.css";
import axios from "axios";
import { firestore } from "./firebase-config.js";
import { useEffect, useState } from "react";
import { weatherApi } from "./api/weather.js";

function App() {
  const city = "Seoul";
  const url = `${weatherApi.base}weather?q=${city}&appid=${weatherApi.key}`;
  const [weather, setWeather] = useState("");

  axios.get(url).then((responseData) => {
    const data = responseData.data;
    setWeather({
      id: data.weather[0].id,
      temperature: data.main.temp,
      main: data.weather[0].main,
      loading: false,
    });
  });

  useEffect(() => {
    // bucket이라는 변수로 firestore의 collection인 bucket에 접근
    const bucket = firestore.collection("weather_closet");

    // collection의 document인 "bucket_item"을 가져온다.
    bucket
      .doc("zero_to_twenty_degree")
      .get()
      .then((doc) => {
        // document의 데이터를 가져옴
        console.log(doc.data());
        // document의 id를 가져옴
        console.log(doc.id);
      });
  });

  return <div className="App">{weather.temperature}</div>;
}

export default App;
