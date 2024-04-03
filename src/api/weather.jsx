import { firestore } from "../firebase-config";

export const weatherApi = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

export const fetchWeather = async () => {
  const weatherInfo = await firestore
    .collection("weatherInfo")
    .doc("weather_item")
    .get();
  return weatherInfo.data();
};

export const fetchOutfit = async () => {
  const snapshot = await firestore
    .collection("dailyLog")
    .orderBy("timestamp", "desc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchOutfitWithTiming = () => {
  const startTime = performance.now();
  const result = fetchOutfit();
  const endTime = performance.now();

  console.log(`fetchOutfit 실행 시간: ${endTime - startTime}ms`);
  return result;
};
