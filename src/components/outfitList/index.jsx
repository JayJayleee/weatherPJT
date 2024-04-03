import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOutfit } from "../../api/weather";
import CharacterCard from "../characterCard";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import loadingAnimation from "../../assets/lottie/loading.json";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "../ui/alert-dialog";

export default function OutfitList() {
  const images = useSelector((state) => state.images.images);

  const [outfitData, setOutfitData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchOutfitWithPerformance()
      .then((data) => {
        setOutfitData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  return (
    <div className="w-full lg:h-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 p-5 snap-y overflow-y-scroll scroll-auto">
      {outfitData &&
        outfitData.map((outfit, index) => {
          const matchingImage =
            images.find((image) => image.path === outfit.imgRoute)?.base64 ||
            outfit.imgRoute;

          return (
            <AlertDialog key={index}>
              <AlertDialogTrigger asChild>
                <CharacterCard props={outfit} />
              </AlertDialogTrigger>

              <AlertDialogContent className="rounded-xl flex flex-col items-center w-full">
                <AlertDialogHeader className="rounded-xl flex flex-col items-center w-full">
                  <AlertDialogTitle className="w-full font-ws text-center text-4xl py-9 underline decoration-sky-500/50 whitespace-normal">
                    {outfit.Title}
                  </AlertDialogTitle>
                  <img
                    src={matchingImage.base64}
                    className="w-3/4 rounded-xl p-5"
                    alt="최종 이미지"
                  />
                  <AlertDialogDescription className="font-ws text-center text-lg py-5 font-light rounded-lg  w-4/5 whitespace-normal text-white bg-blue-500/80">
                    {outfit.Diary}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-ws rounded-full w-1/3">
                    뒤로가기
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        })}
    </div>
  );
}

const fetchOutfitWithPerformance = () => {
  const startTime = performance.now();
  const response = fetchOutfit();
  const endTime = performance.now();

  const timeTaken = endTime - startTime;
  console.log(`요청에 걸린 시간: ${timeTaken}ms`);

  return response;
};
