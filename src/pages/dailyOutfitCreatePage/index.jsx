import { useState, useEffect } from 'react';
import { firestore } from '../../firebase-config';
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from '../../api/weather';

export default function DailyOutfitCreatePage() {
  const { data: weatherdata, isLoading, error } = useQuery({
    queryKey: ['getWeather'],
    queryFn: fetchWeather,
  });

  const [codyList, setCodyList] = useState({
    item: {},
    bottom: {},
    top: {},
  });

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
        console.error("dailyOutfitCreatePage 내에 weather_cloth 가져오기 실패", error);
      }
    };

    let docId = ""; 
    if (weatherdata && weatherdata.degree <= 5) {
      docId = "under_five";
    } else if (weatherdata && weatherdata.degree > 5 && weatherdata.degree <= 10) {
      docId = "five_to_ten";
    } else if (weatherdata && weatherdata.degree > 10) {
      docId = "ten_to_over";
    }

    if (docId) fetchWeatherCloth(docId); 
  }, [weatherdata]); 

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;


  return (
    <div>
      <p>서울은 {weatherdata.degree}도이고 날씨는 {weatherdata.status}</p>
      
      <div>상의
        {Object.entries(codyList.top).map(([key, value]) => (
          <div key={key}>{value.name} ({value.code})</div>
        ))}
      </div>
      
      <div>하의
        {Object.entries(codyList.bottom).map(([key, value]) => (
          <div key={key}>{value.name} ({value.code})</div>
        ))}
      </div>

      <div>아이템
        {Object.entries(codyList.item).map(([key, value]) => (
          <div key={key}>{value.name} ({value.code})</div>
        ))}
      </div>
    </div>
  );
}