import { useState, useEffect } from "react";
import { firestore } from "../../firebase-config";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../api/weather";
import OutfitCarousel from "../../components/outfitCarousel";
import { doc, setDoc, collection } from "firebase/firestore";
import { formattedDate } from "../../constant";
import weatherDescKo from "../../api/weatherDescKo.js";
import { useToast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function DailyOutfitCreatePage() {
  const navigate = useNavigate();
  const {
    data: weatherdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getWeather"],
    queryFn: fetchWeather,
  });

  const getWeatherDescription = (weatherId) => {
    const descriptionObject = weatherDescKo.find((desc) => desc[weatherId]);
    return descriptionObject ? descriptionObject[weatherId] : "날씨 정보 없음";
  };

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

  const { toast } = useToast();

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
      navigate("/outfitlist");
      toast({
        title: "오늘의 코디 성공!",
        description: "다른 사람들의 코디도 둘러보세요!",
      });
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패하였습니다.");
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="md:grid md:grid-cols-3 md:gap-4 flex flex-col justify-center items-center h-screen">
      <div className="md:col-span-1 w-full flex flex-col justify-center items-center md:w-auto md:h-2/3">
        <div className="font-ws text-xl md:text-3xl w-3/4 text-center md:p-5 text-white bg-cyan-500/30 md:mb-4 rounded-full">
          오늘 날씨는? {weatherdata.degree}°C <br />
          {getWeatherDescription(weatherdata.id)}!
        </div>
        <img
          src={imgRoute}
          alt="캐릭터 코디 이미지"
          className="h-60 md:h-full my-5"
        />
      </div>

      <div className="md:col-span-2 w-full">
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
          imgRoute={imgRoute}
        />
      </div>
    </div>
  );
}
