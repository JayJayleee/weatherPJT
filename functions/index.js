const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();


exports.scheduledWeatherUpdate = functions.pubsub.schedule("0 7,18 * * *")
    .timeZone("Asia/Seoul")
    .onRun(() => {
      const weatherApi = {
        city: "Seoul",
        key: process.env.REACT_APP_API_KEY,
        base: "https://api.openweathermap.org/data/2.5/",
      };
      const weatherApilink = `${weatherApi.base}weather?q=${weatherApi.city}&appid=${weatherApi.key}&units=metric`;

      const request = require("request");
      request(weatherApilink, (error, res, body) => {
        if (!error && res.statusCode == 200) {
          const weatherData = JSON.parse(body);

          db.collection("weatherInfo").doc("weather_item").set({
            degree: weatherData.main.temp, // 온도
            status: weatherData.weather[0].main, // 날씨 상태
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          })
              .then(() => console.log("openweather API db에 저장 성공"))
              .catch((err) => console.error("openweather API db에 저장 실패", err));
        } else {
          console.error("openweather API 호출 상태이상:", error);
        }
      });
      return null;
    });
