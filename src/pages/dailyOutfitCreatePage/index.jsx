import { useState, useEffect } from "react";
import { firestore } from "../../firebase-config";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../api/weather";
import OutfitCarousel from "../../components/outfitCarousel";
import { doc, setDoc, collection } from "firebase/firestore";
import { formattedDate } from "../../constant";

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
  const [imgRoute, setImgRoute] = useState("/image/outfitImage/basic.png");
  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");

  console.log(imgRoute);
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
        `/image/outfitImage/${currentDegree}_${topOutfit}+${bottomOutfit}+${itemOutfit}.png`
      );
    }
  }, [topOutfit, bottomOutfit, itemOutfit]);

  const saveDailyLog = async () => {
    const docRef = doc(collection(firestore, "dailyLog"), formattedDate);
    try {
      await setDoc(docRef, {
        imgRoute: imgRoute,
        degree: weatherdata.degree,
        status: weatherdata.status,
        timestamp: new Date(),
        Title: title,
        Diary: diary,
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
    <div className="grid h-screen grid-cols-3 gap-4 justify-center items-center ">
      <div className="col-span-1">
        <img src={imgRoute} alt="캐릭터 코디 이미지" />
      </div>

      <OutfitCarousel
        codyList={codyList}
        pickTop={setTopOutfit}
        pickBottom={setBottomOutfit}
        pickItem={setItemOutfit}
        saveDailyLog={saveDailyLog}
        setTitle={setTitle}
        setDiary={setDiary}
        topOutfit={topOutfit}
        bottomOutfit={bottomOutfit}
        itemOutfit={itemOutfit}
        title={title}
        diary={diary}
        currentDegree={currentDegree}
      />
    </div>
  );
}
