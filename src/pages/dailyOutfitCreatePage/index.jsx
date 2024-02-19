import { useState, useEffect } from "react";
import { firestore } from "../../firebase-config";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../api/weather";
import { doc, setDoc, collection } from "firebase/firestore";

export default function DailyOutfitCreatePage() {
  const {
    data: weatherdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getWeather"],
    queryFn: fetchWeather,
  });

  const [codyList, setCodyList] = useState({
    item: {},
    bottom: {},
    top: {},
  });
  const [currentDegree, setCurrentDegree] = useState("");
  const [topOutfit, setTopOutfit] = useState("");
  const [bottomOutfit, setBottomOutfit] = useState("");
  const [itemOutfit, setItemOutfit] = useState("");
  const [imgRoute, setImgRoute] = useState("/outfitImage/basic.png");

  useEffect(() => {
    const fetchWeatherCloth = async (docId) => {
      try {
        const docRef = firestore.collection("weather_cloth").doc(docId);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          setCodyList(docSnapshot.data());
        } else {
          console.log("해당 문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(
          "dailyOutfitCreatePage 내에 weather_cloth 가져오기 실패",
          error
        );
      }
    };

    let docId = "";
    if (weatherdata && weatherdata.degree <= 5) {
      docId = "under_five";
    } else if (
      weatherdata &&
      weatherdata.degree > 5 &&
      weatherdata.degree <= 10
    ) {
      docId = "five_to_ten";
    } else if (weatherdata && weatherdata.degree > 10) {
      docId = "ten_to_over";
    }

    if (docId) {
      fetchWeatherCloth(docId);
      setCurrentDegree(docId);
    }
  }, [weatherdata]);

  useEffect(() => {
    if (currentDegree && (topOutfit || bottomOutfit || itemOutfit)) {
      setImgRoute(
        `/outfitImage/${currentDegree}_${topOutfit}+${bottomOutfit}+${itemOutfit}.png`
      );
    }
  }, [topOutfit, bottomOutfit, itemOutfit]);

  const saveDailyLog = async () => {
    const docRef = doc(collection(firestore, "dailyLog"));
    try {
      await setDoc(docRef, {
        imgRoute: imgRoute,
        degree: weatherdata.degree,
        status: weatherdata.status,
        timestamp: new Date(),
      });
      alert("저장되었습니다!");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패하였습니다.");
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div class="grid grid-cols-3 gap-4">
      <div>
        <img src={imgRoute} alt="캐릭터 코디 이미지" />
      </div>
      <p>
        서울은 {weatherdata.degree}도이고 날씨는 {weatherdata.status}
      </p>
      <div>
        <div>
          <p>상의</p>
          {Object.entries(codyList.top).map(([key, value]) => (
            <button
              class="px-6 h-12 uppercase font-WS tracking-wider border-2 border-black bg-teal-400 text-black"
              type="submit"
              key={key}
              onClick={() => setTopOutfit(value.code)}
            >
              {value.name}
            </button>
          ))}
        </div>

        <div>
          <p>하의</p>
          {Object.entries(codyList.bottom).map(([key, value]) => (
            <button
              class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
              type="submit"
              key={key}
              onClick={() => setBottomOutfit(value.code)}
            >
              {value.name}
            </button>
          ))}
        </div>

        <div>
          <p>아이템</p>
          {Object.entries(codyList.item).map(([key, value]) => (
            <button
              class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
              type="submit"
              key={key}
              onClick={() => setItemOutfit(value.code)}
            >
              {value.name}
            </button>
          ))}
        </div>

        <button
          onClick={saveDailyLog}
          class="px-6 h-12  bg-teal-400"
          type="submit"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
